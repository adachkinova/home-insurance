package com.app.service;

import com.app.model.model.Image;
import com.app.repository.ImageRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

	private final ImageRepository imageRepository;

	public ImageService(ImageRepository imageRepository) {
		this.imageRepository = imageRepository;
	}

	@Async
	public void saveImagesAsync(List<Image> images) {
		imageRepository.saveAll(images);
	}
}