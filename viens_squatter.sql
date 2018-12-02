-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  Dim 02 déc. 2018 à 20:24
-- Version du serveur :  10.1.36-MariaDB
-- Version de PHP :  7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `viens_squatter`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonce`
--

CREATE TABLE `annonce` (
  `id` int(10) UNSIGNED NOT NULL,
  `author` int(10) UNSIGNED NOT NULL,
  `theme` int(10) UNSIGNED NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `nb_participants` tinyint(4) NOT NULL,
  `datetime` datetime NOT NULL,
  `departement` varchar(30) NOT NULL,
  `adresse` varchar(200) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `annonce`
--

INSERT INTO `annonce` (`id`, `author`, `theme`, `title`, `description`, `nb_participants`, `datetime`, `departement`, `adresse`, `img`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'game de lol', 'salut ca va', 0, '0000-00-00 00:00:00', '', '', NULL, '2018-11-29 12:52:09', '2018-11-29 12:52:51'),
(3, 7, 1, 'grosse soirée ambiance enerve', 'chicha bédo cocaine et timps a gogo illimité ', 0, '0000-00-00 00:00:00', '', '', 'miiine', '2018-11-29 12:52:09', '2018-11-29 12:52:51'),
(4, 7, 1, 'grosse soirée ambiance enerve', 'chicha bédo cocaine et timps a gogo illimité ', 0, '0000-00-00 00:00:00', '', '', 'miiine', '2018-11-29 12:52:09', '2018-11-29 12:52:51'),
(6, 7, 1, 'grosse soirée ambiance enerve', 'chicha bédo cocaine et timps a gogo illimité ', 0, '0000-00-00 00:00:00', '', '', 'miiine', '2018-11-29 12:52:09', '2018-11-29 12:52:51'),
(7, 7, 1, 'grosse soirée ambiance enerve', 'chicha bédo cocaine et timps a gogo illimité ', 0, '0000-00-00 00:00:00', '', '', 'miiine', '2018-11-29 12:52:09', '2018-11-29 12:52:51'),
(8, 7, 1, 'grosse soirée ambiance enerve', 'chicha bédo cocaine et timps a gogo illimité ', 0, '0000-00-00 00:00:00', '', '', 'miiine', '2018-11-29 12:52:09', '2018-11-29 12:52:51'),
(9, 7, 1, 'test de la date', 'date', 0, '0000-00-00 00:00:00', '', '', 'miiine', '2018-11-29 12:52:09', '2018-11-29 12:52:51');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_author_com` int(10) UNSIGNED NOT NULL,
  `id_annonce_com` int(10) UNSIGNED NOT NULL,
  `comment` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `id_author_com`, `id_annonce_com`, `comment`, `created_at`, `updated_at`) VALUES
(1, 7, 1, 'je ramène 2 manettes', '2018-11-30 14:42:21', '2018-11-30 15:06:17');

-- --------------------------------------------------------

--
-- Structure de la table `inscrit`
--

CREATE TABLE `inscrit` (
  `id_annonce` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id_liked` int(10) UNSIGNED NOT NULL,
  `id_who_like` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_author_msg` int(10) UNSIGNED NOT NULL,
  `id_receiver_msg` int(10) UNSIGNED NOT NULL,
  `message` longtext NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id`, `id_author_msg`, `id_receiver_msg`, `message`, `created_at`) VALUES
(6, 1, 5, 'c\'est bien a 18h la soirée ?', '2018-12-01 11:56:18'),
(7, 5, 1, 'ouais c\'est bien ca !', '2018-12-01 12:04:47'),
(8, 1, 5, 'ok parfait a toute a l\'heure ', '2018-12-01 12:05:03'),
(9, 1, 7, 'bien ou quoi ', '2018-12-01 15:21:22'),
(10, 1, 5, 'et oublie pas ta mere ', '2018-12-01 21:06:43'),
(11, 1, 5, 'mdr ', '2018-12-01 21:06:51');

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE `theme` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `img` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`id`, `name`, `img`) VALUES
(1, 'tagrose mere', NULL),
(2, 'Sport', NULL),
(3, 'tagrose mere', 'img'),
(9, 'tagrose mere', NULL),
(10, 'spo', 'eree'),
(11, 'tagrose mere', NULL),
(12, 'spoz', 'eree');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `departement` varchar(45) DEFAULT NULL,
  `sexe` varchar(1) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `vote` int(11) UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `nickname`, `email`, `password`, `departement`, `sexe`, `img`, `vote`) VALUES
(1, 'breeeeeeeh', 'lele', 'alex@lol.fr', 'alex', NULL, NULL, NULL, NULL),
(5, 'flex', 'bendo', 'lol@lil.lol', '27', 'om', 'G', 'img', NULL),
(7, 'zdraaaaaaaa', 'bendo', 'lol@lil.lol', '27', 'om', 'G', 'img', NULL),
(8, 'alex', 'bendo', 'lol@lil.lol', '27', 'paris', 'G', 'img', NULL),
(9, 'alex', 'bendo', 'lol@lil.lol', '27', 'paris', 'G', 'img', NULL),
(10, 'flextaflux', 'bendo', 'lol@lil.lol', '27', 'paris', 'G', 'img', NULL),
(11, 'flextaflux', 'bendo', 'lol@lil.lol', '27', 'paris', 'G', 'img', NULL),
(12, 'flextafluxfleeeeeex', 'bendo', 'lol@lil.lol', '27', 'paris', 'G', 'img', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`author`),
  ADD KEY `theme` (`theme`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_author_com` (`id_author_com`),
  ADD KEY `id_annonce_com` (`id_annonce_com`);

--
-- Index pour la table `inscrit`
--
ALTER TABLE `inscrit`
  ADD PRIMARY KEY (`id_annonce`,`id_user`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_liked`,`id_who_like`),
  ADD KEY `id_who_like` (`id_who_like`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_author_msg` (`id_author_msg`),
  ADD KEY `id_receiver_msg` (`id_receiver_msg`);

--
-- Index pour la table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annonce`
--
ALTER TABLE `annonce`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `theme`
--
ALTER TABLE `theme`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD CONSTRAINT `author` FOREIGN KEY (`author`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `theme` FOREIGN KEY (`theme`) REFERENCES `theme` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `id_annonce_com` FOREIGN KEY (`id_annonce_com`) REFERENCES `annonce` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_author_com` FOREIGN KEY (`id_author_com`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `inscrit`
--
ALTER TABLE `inscrit`
  ADD CONSTRAINT `id_annonce` FOREIGN KEY (`id_annonce`) REFERENCES `annonce` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `id_liked` FOREIGN KEY (`id_liked`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_who_like` FOREIGN KEY (`id_who_like`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `id_author_msg` FOREIGN KEY (`id_author_msg`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_receiver_msg` FOREIGN KEY (`id_receiver_msg`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
