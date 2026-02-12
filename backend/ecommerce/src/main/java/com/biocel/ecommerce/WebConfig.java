package com.biocel.ecommerce;



import net.kaczmarzyk.spring.data.jpa.web.SpecificationArgumentResolver;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;



@Configuration
public class WebConfig implements WebMvcConfigurer {

      @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new SpecificationArgumentResolver());
    }
}
