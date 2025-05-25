package com.billing.backend.repositories;

import com.billing.backend.entites.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    Optional<Item> findByItemId(String id);

    Integer countByCategoryId(Long id);
}
