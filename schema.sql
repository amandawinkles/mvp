DROP DATABASE IF EXISTS faves;
CREATE DATABASE faves;

USE faves;
-- ---
-- Table 'likedArtistData'
--
-- ---

DROP TABLE IF EXISTS `likedArtistData`;

CREATE TABLE `likedArtistData` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NOT NULL,
  `artistLink` VARCHAR NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `likedArtistData` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `likedArtistData` (`id`,`name`,`artistLink`) VALUES
-- ('','','');