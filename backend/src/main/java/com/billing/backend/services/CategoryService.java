package com.billing.backend.services;

import com.billing.backend.io.CategoryRequest;
import com.billing.backend.io.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
