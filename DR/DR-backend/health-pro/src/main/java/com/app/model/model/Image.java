package com.app.model.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String filePath; // Store only the path, not Base64

	@ManyToOne
	@JoinColumn(name = "claim_id")
	private Claim claim; // Each image belongs to one claim
}