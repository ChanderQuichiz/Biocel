import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Summary = {
  totalRevenue: number
  totalOrders: number
  totalItems: number
  totalCustomers: number
  avgTicket: number
}

type TopProduct = {
  productId: number
  name: string
  units: number
  revenue: number
}

type SalesPoint = {
  day: string // YYYY-MM-DD
  total: number
}

const API = (import.meta as any).env?.VITE_API_URL ?? "http://localhost:8020"

function formatLocalYYYYMMDD(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function Reports() {
  const [rangeDays, setRangeDays] = useState<"7" | "30" | "90">("30")

  const [loadingSummary, setLoadingSummary] = useState(true)
  const [loadingTop, setLoadingTop] = useState(true)
  const [loadingSales, setLoadingSales] = useState(true)

  const [errorSummary, setErrorSummary] = useState<string | null>(null)
  const [errorTop, setErrorTop] = useState<string | null>(null)
  const [errorSales, setErrorSales] = useState<string | null>(null)

  const [summary, setSummary] = useState<Summary | null>(null)
  const [top, setTop] = useState<TopProduct[]>([])
  const [sales, setSales] = useState<SalesPoint[]>([])

  const money = useMemo(
    () =>
      new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
      }),
    []
  )

  // ====== Summary (1 vez) ======
  useEffect(() => {
    ;(async () => {
      try {
        setLoadingSummary(true)
        setErrorSummary(null)

        const s1 = await fetch(`${API}/reports/summary`).then(async (r) => {
          if (!r.ok) throw new Error(`summary ${r.status}`)
          return r.json()
        })

        setSummary({
          totalRevenue: Number(s1.totalRevenue ?? 0),
          totalOrders: Number(s1.totalOrders ?? 0),
          totalItems: Number(s1.totalItems ?? 0),
          totalCustomers: Number(s1.totalCustomers ?? 0),
          avgTicket: Number(s1.avgTicket ?? 0),
        })
      } catch (e: any) {
        setErrorSummary(
          `No pude cargar summary. Verifica /reports/summary en ${API}. (${e?.message ?? "error"})`
        )
      } finally {
        setLoadingSummary(false)
      }
    })()
  }, [])

  // ====== Top products (1 vez) ======
  useEffect(() => {
    ;(async () => {
      try {
        setLoadingTop(true)
        setErrorTop(null)

        // Si tu backend luego soporta días, puedes activar:
        // const url = `${API}/reports/top-products?limit=5&days=${rangeDays}`
        // Por ahora dejamos simple:
        const url = `${API}/reports/top-products?limit=5`

        const s2 = await fetch(url).then(async (r) => {
          if (!r.ok) throw new Error(`top-products ${r.status}`)
          return r.json()
        })

        setTop(
          (s2 ?? []).map((x: any) => ({
            productId: Number(x.productId),
            name: String(x.name),
            units: Number(x.units),
            revenue: Number(x.revenue),
          }))
        )
      } catch (e: any) {
        setErrorTop(
          `No pude cargar top-products. Verifica /reports/top-products en ${API}. (${e?.message ?? "error"})`
        )
      } finally {
        setLoadingTop(false)
      }
    })()
  }, [])

  // ====== Sales (depende del rango) ======
  useEffect(() => {
    ;(async () => {
      try {
        setLoadingSales(true)
        setErrorSales(null)

        const s3 = await fetch(`${API}/reports/sales?days=${rangeDays}`).then(
          async (r) => {
            if (!r.ok) throw new Error(`sales ${r.status}`)
            return r.json()
          }
        )

        setSales(
          (s3 ?? []).map((x: any) => ({
            day: String(x.day),
            total: Number(x.total),
          }))
        )
      } catch (e: any) {
        setErrorSales(
          `No pude cargar sales. Verifica /reports/sales?days=... en ${API}. (${e?.message ?? "error"})`
        )
        setSales([])
      } finally {
        setLoadingSales(false)
      }
    })()
  }, [rangeDays])

  // ✅ Rellena días faltantes con 0 para que el chart tenga 7/30/90 puntos fijos
  const salesSeries = useMemo<SalesPoint[]>(() => {
    const days = Number(rangeDays)
    const map = new Map<string, number>(sales.map((s) => [s.day, s.total]))
    const out: SalesPoint[] = []

    const today = new Date()
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const day = formatLocalYYYYMMDD(d)
      out.push({ day, total: map.get(day) ?? 0 })
    }
    return out
  }, [sales, rangeDays])

  const maxSale = useMemo(() => {
    const m = Math.max(...salesSeries.map((s) => s.total), 0)
    return m <= 0 ? 1 : m
  }, [salesSeries])

  // Sparkline points para SVG (viewBox: width = n-1, height = H)
  const chartH = 170
  const sparkPoints = useMemo(() => {
    const n = salesSeries.length
    if (n <= 1) return ""
    return salesSeries
      .map((p, i) => {
        const x = i
        const y = chartH - (p.total / maxSale) * chartH
        const yy = Number.isFinite(y) ? Math.max(0, Math.min(chartH, y)) : chartH
        return `${x},${yy.toFixed(2)}`
      })
      .join(" ")
  }, [salesSeries, maxSale])

  const anyError = errorSummary || errorTop || errorSales

  return (
    <TooltipProvider delayDuration={80}>
      <div className="space-y-6">
        {/* Header + selector */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Reportes</h2>
            <p className="text-sm text-muted-foreground">
              Productos más vendidos y métricas de ventas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={rangeDays} onValueChange={(v) => setRangeDays(v as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rango" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 días</SelectItem>
                <SelectItem value="30">Últimos 30 días</SelectItem>
                <SelectItem value="90">Últimos 90 días</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="secondary">Admin</Badge>
          </div>
        </div>

        {/* Errores */}
        {anyError && (
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="text-base text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {errorSummary && <div>• {errorSummary}</div>}
              {errorTop && <div>• {errorTop}</div>}
              {errorSales && <div>• {errorSales}</div>}
            </CardContent>
          </Card>
        )}

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ganancias totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingSummary ? (
                <Skeleton className="h-8 w-40" />
              ) : (
                <div className="text-2xl font-bold">
                  {money.format(summary?.totalRevenue ?? 0)}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Órdenes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingSummary ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{summary?.totalOrders ?? 0}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ítems vendidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingSummary ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold">{summary?.totalItems ?? 0}</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ticket promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingSummary ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <div className="text-2xl font-bold">
                  {money.format(summary?.avgTicket ?? 0)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Ventas + Top */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* CHART */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Ventas últimos {rangeDays} días</CardTitle>
              <div className="text-xs text-muted-foreground">
                {loadingSales ? "Cargando..." : `${salesSeries.length} días`}
              </div>
            </CardHeader>

            <CardContent>
              {loadingSales ? (
                <Skeleton className="h-[240px] w-full" />
              ) : (
                <div className="h-[240px] w-full rounded-md border p-3">
                  <div className="relative h-[190px]">
                    {/* Línea base */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

                    {/* Sparkline encima (SVG) */}
                    {salesSeries.length > 1 && (
                      <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox={`0 0 ${Math.max(1, salesSeries.length - 1)} ${chartH}`}
                        preserveAspectRatio="none"
                      >
                        <polyline
                          points={sparkPoints}
                          fill="none"
                          className="stroke-primary"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.9"
                        />
                      </svg>
                    )}

                    {/* Barras + tooltips */}
                    <div className="absolute inset-0 flex items-end gap-1">
                      {salesSeries.map((p, i) => {
                        const isZero = p.total <= 0
                        const barPx = isZero ? 0 : Math.round((p.total / maxSale) * chartH)

                        // opcional: marcar fines de semana (suave)
                        const isWeekend = (() => {
                          const d = new Date(p.day + "T00:00:00")
                          const day = d.getDay()
                          return day === 0 || day === 6
                        })()

                        return (
                          <Tooltip key={`${p.day}-${i}`}>
                            <TooltipTrigger asChild>
                              <div
                                className="relative h-full flex-1 cursor-pointer"
                                aria-label={`${p.day} ${money.format(p.total)}`}
                              >
                                {/* hit area completa; barra solo al fondo */}
                                {barPx > 0 && (
                                  <div
                                    className={[
                                      "absolute bottom-0 left-0 right-0 rounded-sm",
                                      isWeekend ? "bg-primary/60" : "bg-primary/70",
                                    ].join(" ")}
                                    style={{ height: `${barPx}px` }}
                                  />
                                )}
                              </div>
                            </TooltipTrigger>

                            <TooltipContent side="top" align="center">
                              <div className="text-xs">
                                <div className="font-medium">{p.day}</div>
                                <div className="text-muted-foreground">
                                  {money.format(p.total)}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Tip: pasa el mouse sobre una barra o la línea.</span>
                    <span>Máx: {money.format(maxSale)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* TOP PRODUCTS */}
          <Card>
            <CardHeader>
              <CardTitle>Productos más vendidos</CardTitle>
            </CardHeader>

            <CardContent>
              {loadingTop ? (
                <div className="space-y-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-right">Unid.</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {top.map((p) => (
                      <TableRow key={p.productId}>
                        <TableCell className="max-w-[230px]">
                          <div className="font-medium truncate">{p.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {money.format(p.revenue)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{p.units}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}

                    {top.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={2} className="text-sm text-muted-foreground">
                          Sin datos todavía.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}