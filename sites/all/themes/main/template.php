<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


// Adds row count to all views classes
function main_preprocess_views_view(&$vars) {
  $vars['classes_array'][] = 'view-count-' . count($vars['view']->result);
}
