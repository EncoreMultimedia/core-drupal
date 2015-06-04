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

// Change LI class name on special menu items
function main_process_menu_link(&$variables, $hook) {
  if ($variables['element']['#href'] == '<block>') {
    array_unshift($variables['element']['#attributes']['class'], 'special-block');
  }
}
