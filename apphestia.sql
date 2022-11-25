-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 27 sep. 2022 à 14:54
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `apphestia`
--

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `Genre` varchar(255) NOT NULL,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `code_postal` varchar(255) NOT NULL,
  `date_naissance` date NOT NULL,
  `Etat_civile` varchar(255) NOT NULL,
  `enfant_acharge` int(11) NOT NULL,
  `child_item` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT json_array() CHECK (json_valid(`child_item`)),
  `assurance` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT json_array() CHECK (json_valid(`assurance`)),
  `identite` varchar(255) DEFAULT NULL,
  `pdf_signature` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`id`, `Genre`, `Nom`, `Prenom`, `email`, `password`, `adress`, `telephone`, `code_postal`, `date_naissance`, `Etat_civile`, `enfant_acharge`, `child_item`, `assurance`, `identite`, `pdf_signature`, `created_at`, `updated_at`) VALUES
(1, 'male', 'elbouinany', 'ayoub', 'ayoub@gmail.com', '$2b$10$FZMiQcwsG2gtnRNv/U1OgurUuUCKxBaiPjANnSzkWm4HwT9zlIhvi', 'safi', '0708901150', '46000', '1999-09-26', 'celebataire', 2, '[{\"id\":1,\"date\":\"2012-09-26T16:08:23.214Z\",\"show\":false},{\"id\":2,\"date\":\"2016-09-26T16:08:23.214Z\",\"show\":false}]', '[{\"id\":1,\"txt\":\"asserance 1\",\"isChecked\":true},{\"id\":3,\"txt\":\"asserance 3\",\"isChecked\":true}]', 'photo_2022-09-26T17-05-44.762Z_rn_image_picker_lib_temp_d1e18c63-22d4-4b00-86a9-602f0bf60d26.jpg', 'elbouinany-ayoub.pdf', '2022-09-26 18:05:44', '2022-09-26 18:05:44'),
(2, 'male', 'elbouinany', 'ayoub', 'ayoub_test@gmail.com', '$2b$10$V5BTazafqMag17sig1u1Y.odCrOM9.ml6o37qQOyMofVe/OlBMy4a', 'Safi', '0708901150', '46000', '1998-09-23', 'celebataire', 2, '[{\"id\":1,\"date\":\"2014-09-25T18:25:01.797Z\",\"show\":false},{\"id\":2,\"date\":\"2018-09-25T18:25:01.797Z\",\"show\":false}]', '[{\"id\":2,\"txt\":\"asserance 2\",\"isChecked\":true},{\"id\":4,\"txt\":\"asserance 4\",\"isChecked\":true}]', 'photo_2022-09-26T19-09-45.466Z_rn_image_picker_lib_temp_4d1a6233-7c27-4bed-905b-2b04e8b6bf27.jpg', 'elbouinany-ayoub.pdf', '2022-09-26 20:09:45', '2022-09-26 20:09:45');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
