package com.billing.backend.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemRequest {

    private String itemId;
    private String name;
    private Long price;
    private String categoryId;
    private String description;
    private String brand;
}
