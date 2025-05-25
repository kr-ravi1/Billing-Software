package com.billing.backend.services;

import com.billing.backend.io.ItemRequest;
import com.billing.backend.io.ItemResponse;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);

}
