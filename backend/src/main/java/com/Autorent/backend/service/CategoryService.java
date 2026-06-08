package com.Autorent.backend.service;

import com.Autorent.backend.dto.CategoryDTO;
import com.Autorent.backend.model.Category;
import com.Autorent.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    private CategoryDTO toDTO(
            Category category
    ) {

        return new CategoryDTO(
                category.getId(),
                category.getTitle(),
                category.getDescription(),
                category.getImage()
        );

    }

    public List<CategoryDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public CategoryDTO save(Category category) {
        return toDTO (repository.save(category)
        );
    }

    public void delete(Long id) {

        Category category =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Categoría no encontrada"
                                )
                        );

        repository.delete(category);

    }
}

