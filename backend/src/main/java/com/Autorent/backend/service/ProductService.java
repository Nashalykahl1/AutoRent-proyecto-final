package com.Autorent.backend.service;

import com.Autorent.backend.model.Product;
import com.Autorent.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public List<Product> getRecommended() {
        return repo.findByRecommendedTrue();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Product> getRandom() {
        List<Product> list = repo.findAll();
        Collections.shuffle(list);
        return list.stream().limit(10).toList();
    }

    public Product findById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Product save(Product p) {

        if(repo.existsByName(p.getName())) {
            throw new RuntimeException("Ese producto ya existe");
        }

        return repo.save(p);
    }
}