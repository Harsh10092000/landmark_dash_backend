-- Create user_favorites table
CREATE TABLE IF NOT EXISTS `user_favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `property_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_property` (`user_id`, `property_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_property_id` (`property_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add additional indexes for better performance
ALTER TABLE `user_favorites` ADD INDEX `idx_user_property` (`user_id`, `property_id`);
ALTER TABLE `user_favorites` ADD INDEX `idx_created_at` (`created_at`);

-- Sample data (optional - for testing)
-- INSERT INTO `user_favorites` (`user_id`, `property_id`) VALUES 
-- ('user123', 'prop456'),
-- ('user123', 'prop789');
