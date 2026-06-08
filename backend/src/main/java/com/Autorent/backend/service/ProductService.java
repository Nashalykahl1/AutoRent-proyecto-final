package com.Autorent.backend.service;

import com.Autorent.backend.dto.ProductDTO;
import com.Autorent.backend.model.Category;
import com.Autorent.backend.model.Product;
import com.Autorent.backend.repository.CategoryRepository;
import com.Autorent.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;
    private final CategoryRepository categoryRepo;

    public ProductService(
            ProductRepository repo,
            CategoryRepository categoryRepo
    ) {
        this.repo = repo;
        this.categoryRepo = categoryRepo;
    }

    private ProductDTO toDTO(
            Product p
    ) {

        return new ProductDTO(

                p.getId(),

                p.getName(),

                p.getDescription(),

                p.getPrice(),

                p.getImage(),

                p.getLocation(),

                p.getImages(),

                p.getFeatures(),

                p.getCategory().getId(),

                p.getCategory().getTitle(),

                p.getLongDescription()


        );

    }

    public List<ProductDTO> getAll() {

        return repo.findAll()
                .stream()
                .map(this::toDTO)
                .toList();

    }

    public List<ProductDTO> getRecommended() {

        return repo.findByRecommendedTrue()
                .stream()
                .map(this::toDTO)
                .toList();

    }

    public void delete(Long id) {

        Product product =
                repo.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Producto no encontrado"
                                )
                        );

        repo.delete(product);

    }

    public List<ProductDTO> getRandom() {

        List<Product> list =
                repo.findAll();

        Collections.shuffle(list);

        return list.stream()
                .limit(10)
                .map(this::toDTO)
                .toList();

    }

    public ProductDTO findById(Long id) {

        Product product = repo.findById(id)
                .orElseThrow(() ->

                        new RuntimeException(
                                "Producto no encontrado"
                        )
                );

        return toDTO(product);

    }

    public ProductDTO save(Product p) {

        if(repo.existsByName(
                p.getName()
        )) {

            throw new RuntimeException(
                    "Ese producto ya existe"
            );

        }

        Category category = categoryRepo
                .findById(
                        p.getCategory().getId()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Categoría no encontrada"
                        )
                );

        p.setCategory(category);

        return  toDTO(   repo.save(p)
);
    }

}