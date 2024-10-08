package com.zus.spring_boot_ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.zus.spring_boot_ecommerce.entity.Country;
import com.zus.spring_boot_ecommerce.entity.Product;
import com.zus.spring_boot_ecommerce.entity.ProductCategory;
import com.zus.spring_boot_ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager entityManager;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedAction = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE };

        disableHttpMethods(Product.class, config, theUnsupportedAction);
        disableHttpMethods(ProductCategory.class, config, theUnsupportedAction);
        disableHttpMethods(Country.class, config, theUnsupportedAction);
        disableHttpMethods(State.class, config, theUnsupportedAction);

        exposeIds(config);
    }

    private void disableHttpMethods(
            Class<?> theClass,
            RepositoryRestConfiguration config,
            HttpMethod[] theUnsupportedAction) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedAction));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class<?>> entityClasses = new ArrayList<>();

        entities.forEach(entity -> entityClasses.add(entity.getJavaType()));

        Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
