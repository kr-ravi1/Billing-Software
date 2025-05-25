package com.billing.backend.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {

    private String itemId;
    private String name;
    private String brand;
    private Long price;
    private String categoryId;
    private String description;
    private String categoryName;
    private String imgUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
