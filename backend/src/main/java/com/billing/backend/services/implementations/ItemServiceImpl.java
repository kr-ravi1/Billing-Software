package com.billing.backend.services.implementations;

import com.billing.backend.entites.Category;
import com.billing.backend.entites.Item;
import com.billing.backend.io.ItemRequest;
import com.billing.backend.io.ItemResponse;
import com.billing.backend.repositories.CategoryRepository;
import com.billing.backend.repositories.ItemRepository;
import com.billing.backend.services.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    private final CategoryRepository categoryRepository;

    @Override
    public ItemResponse add(ItemRequest request) {
        Item newItem = convertToEntity(request);
        Category existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not Found"));
        newItem.setCategory(existingCategory);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(Item newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .imgUrl(newItem.getImgUrl())
                .price(newItem.getPrice())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .brand(newItem.getBrand())
                .build();
    }

    private Item convertToEntity(ItemRequest request) {
        return Item.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .brand(request.getBrand())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(item -> convertToResponse(item))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        Item existingItem = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not Found"));
        itemRepository.delete(existingItem);
    }
}
