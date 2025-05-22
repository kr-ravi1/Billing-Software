package com.billing.backend.services.implementations;

import com.billing.backend.entites.Category;
import com.billing.backend.io.CategoryRequest;
import com.billing.backend.io.CategoryResponse;
import com.billing.backend.repositories.CategoryRepository;
import com.billing.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public CategoryResponse add(CategoryRequest request) {
        Category newCategory = convertToEntity(request);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(category -> convertToResponse(category))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category Not Found: "+ categoryId));
        categoryRepository.delete(category);
    }

    private CategoryResponse convertToResponse(Category newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .build();
    }

    private Category convertToEntity(CategoryRequest request) {
        return Category.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }


}
