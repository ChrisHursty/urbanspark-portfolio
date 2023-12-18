<?php
/**
 * Plugin Name: UrbanSpark Portfolio
 * Plugin URI: https://urbansparkwp.com
 * Description: A comprehensive portfolio management plugin for WordPress.
 * Version: 1.0.0
 * Author: Chris Hurst
 * Author URI: https://iamchrishurst.com
 * Text Domain: portfolio-us
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

// Define PLUGIN_PATH constant for easy path access
define( 'URBANSPARK_PORTFOLIO_PATH', plugin_dir_path( __FILE__ ) );

class UrbanSparkPortfolio {

    public function __construct() {
        // Add actions to initialize the plugin and register CPT and taxonomy
        add_action( 'init', array( $this, 'create_portfolio_cpt' ) );
        add_action( 'init', array( $this, 'create_genre_taxonomy' ) );
    }

    public function create_portfolio_cpt() {
        $args = array(
            'public'       => true,
            'label'        => 'Portfolio',
            'supports'     => array('title', 'editor', 'thumbnail'), // Ensure 'editor' is included
            'show_in_rest' => true,  // Enable Gutenberg editor
        );
        register_post_type('portfolio', $args);
    }
    

    public function create_genre_taxonomy() {
        $args = array(
            'label'        => 'Genres',
            'rewrite'      => array( 'slug' => 'genre' ),
            'hierarchical' => true,
        );
        register_taxonomy( 'genre', 'portfolio', $args );
    }
}

// Instantiate the class
$urbanSparkPortfolio = new UrbanSparkPortfolio();

// Only and custom blocks to portfolio cpt
function portfolio_us_allowed_block_types( $allowed_blocks, $context ) {
    if ( ! isset( $context->post_type ) || $context->post_type !== 'portfolio' ) {
        return $allowed_blocks;
    }

    return array(
        'core/image',
        'core/paragraph',
        'core/heading',
        // Add more core blocks as needed
        'portfolio-us/portfolio-details', // Your custom block
        // Include other custom blocks for 'portfolio' CPT if necessary
    );
}

add_filter( 'allowed_block_types_all', 'portfolio_us_allowed_block_types', 10, 2 );

// enqueue block editor js
function portfolio_us_enqueue_block_editor_assets() {
    wp_enqueue_script(
      'portfolio-us-blocks',
      plugins_url( 'build/index.js', __FILE__ ),
      array( 'wp-blocks', 'wp-element', 'wp-editor' ),
      filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
    );
  }
  add_action( 'enqueue_block_editor_assets', 'portfolio_us_enqueue_block_editor_assets' );
  