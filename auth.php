<?php

require_once('wp-load.php');
 $response = array(
     'data'        => array(),
     'msg'        => 'Invalid email or password',
     'status'    => false
 );

/* Sanitize POST */
foreach ($_POST as $k => $value) {
    $_POST[$k] = sanitize_text_field($value);
}
header('Content-type: application/json');

/**
 * Login
 *isset($_POST['type']) &&  
 */
if (isset($_POST['type']) &&  $_POST['type'] == 'login') {
    // Get user 
    $user = get_user_by('login', $_POST['email']);
    if ($user) {
        $response['Email_Valid'] = true;
        $password_check = wp_check_password($_POST['password'], $user->user_pass, $user->ID);
        if ($password_check) {
            $response['Pass_Valid'] = true;
            update_user_meta($user->ID, 'push_token', $_POST['push_token']);
            // Generate token - MUST BE IMPROVED
            $token = md5(uniqid());
            // Save token as a meta for user
            if (update_user_meta($user->ID, 'auth_token', $token)) {
                $response['avatar'] = get_avatar_url($user->ID, ['force_default'=>false]);
                //Build the response object
                $response['status'] = true;
                $response['data'] = array(
                    'auth_token'     =>    $token,
                    'user_id'        =>    $user->ID,
                    'user_login'    =>    $user->user_login
                );
                $response['msg'] = 'Successfully Authenticated';
                $response['token'] = $token;
            }
        } else {
            $response['Pass_Valid'] = false;
        };
    } else {
        $response['Email_Valid'] = false;
        $response['status'] = false;
        $response['msg'] = 'Unsuccessfully Authenticated';
    }
}





if (isset($_POST['type']) &&  $_POST['type'] == 'create') {
    
    // Add Featured Image to Post
    $image_url        = $_POST['file'];
    $image_name       = 'wp-header-logo.jpg';
    $upload_dir       = wp_upload_dir(); // Set upload folder
    $image_data       = file_get_contents($image_url); // Get image data
    $unique_file_name = wp_unique_filename( $upload_dir['path'], $image_name ); 
    $filename         = basename( $unique_file_name ); // Create image file name


// Check folder permission and define file location
    if( wp_mkdir_p( $upload_dir['path'] ) ) {
        $file = $upload_dir['path'] . '/' . $filename;
    } else {
        $file = $upload_dir['basedir'] . '/' . $filename;
    }
    // Create the image  file on the server
    file_put_contents( $file, $image_data );

    // Check image file type
    $wp_filetype = wp_check_filetype( $filename, null );

    // Set attachment data
    $attachment = array(
        'post_mime_type' => $wp_filetype['type'],
        'post_title'     => sanitize_file_name( $filename ),
        'post_content'   => '',
        'post_status'    => 'inherit'
    );

    // Create the attachment
    $attach_id = wp_insert_attachment( $attachment, $file, $post_id );

    // Include image.php
    require_once(ABSPATH . 'wp-admin/includes/image.php');

    // Define attachment metadata
    $attach_data = wp_generate_attachment_metadata( $attach_id, $file );

    // Assign metadata to attachment
    wp_update_attachment_metadata( $attach_id, $attach_data );

    // Create post object
    $my_post = array(
        'post_title'    => $_POST['title'],
        'post_content'  => $_POST['description'],
        'post_status'   => 'publish',
        'post_type' => 'dp_listing',
        'post_author'   => $_POST['userId'],
    );
    $id = wp_insert_post($my_post);
    add_post_meta($id, "_field_9", $_POST['price'], false);

    add_post_meta($id, "_thumbnail_id", $attach_id , false);
   add_post_meta($id, "_attached_image", $attach_id , false);
    add_post_meta($id, "_attached_image_as_logo", $attach_id , false);
     add_post_meta($id, "_field_6", $_POST['phone'] , false);
      add_post_meta($id, "_address_line_1", $_POST['adress'] , false);
       //add_post_meta($id, "_attached_image_as_logo", $attach_id , false);
    set_post_thumbnail( $id, $attach_id );
    $basketItems = $_POST['catId'];
     $cat_array = json_decode($basketItems);
    //$cat_ids = array( 325,  );
    	
    wp_set_object_terms( $id,$cat_array, 'directorypress-category' );
    wp_set_object_terms( $id, 2, 'directorypress-location' );
    $response['msg'] = 'Successfully Post';
}




// Create new User
if (isset($_POST['type']) &&  $_POST['type'] == 'CreateUser') {

    // Get user user_login
    $check_email = get_user_by('email', $_POST['email']);
    // $check_user = get_user_by('user_login', "username");
    if (!$check_email) {
        $response['Email_Valid'] = true;

        $check_user = get_user_by('login', $_POST['name']);
        if (!$check_user) {
            $userdata = array(
                'first_name'            => $_POST['name'],  
                'last_name'             => $_POST['lastname'],  
                'user_login'            =>  $_POST['username'],
                'user_email'            => $_POST['email'],   
                'user_pass'             =>  $_POST['password'],
                "locale"                => "maroc"
            ); 
            $user_id = wp_insert_user( $userdata );
            
            //wp_create_user($_POST['name'], $_POST['password'], $_POST['email']);
            $response['User_Valid'] = true;
            $response['User_Created'] = true;
        } else {
            $response['User_Valid'] = false;
            $response['User_Created'] = false;
        }
    } else {
        $response['Email_Valid'] = false;
        $response['User_Created'] = false;
    }
};





// Create Message
if (isset($_POST['type']) &&  $_POST['type'] == 'SendMessage') {
    $my_post = array(
        'post_title'    => $_POST['title'],
        'post_content'  => $_POST['msg'],
        'post_status'   => 'publish',
        'post_type' => 'difp_message',
        'post_author'   => $_POST['sender'],

    );
    $id = wp_insert_post($my_post);
    add_post_meta($id, "_difp_participants", $_POST['author'], false);

}






// Upload Images
if (isset($_POST['type']) &&  $_POST['type'] == 'UpImage') {
// Add Featured Image to Post
    $image_url        = $_POST['file'];
    $image_name       = 'wp-header-logo.jpg';
    $upload_dir       = wp_upload_dir(); // Set upload folder
    $image_data       = file_get_contents($image_url); // Get image data
    $unique_file_name = wp_unique_filename( $upload_dir['path'], $image_name ); 
    $filename         = basename( $unique_file_name ); // Create image file name


// Check folder permission and define file location
    if( wp_mkdir_p( $upload_dir['path'] ) ) {
        $file = $upload_dir['path'] . '/' . $filename;
    } else {
        $file = $upload_dir['basedir'] . '/' . $filename;
    }
    // Create the image  file on the server
    file_put_contents( $file, $image_data );

    // Check image file type
    $wp_filetype = wp_check_filetype( $filename, null );

    // Set attachment data
    $attachment = array(
        'post_mime_type' => $wp_filetype['type'],
        'post_title'     => sanitize_file_name( $filename ),
        'post_content'   => '',
        'post_status'    => 'inherit'
    );

    // Create the attachment
    $attach_id = wp_insert_attachment( $attachment, $file, $post_id );

    // Include image.php
    require_once(ABSPATH . 'wp-admin/includes/image.php');

    // Define attachment metadata
    $attach_data = wp_generate_attachment_metadata( $attach_id, $file );

    // Assign metadata to attachment
    wp_update_attachment_metadata( $attach_id, $attach_data );
    $response['Email_Valid'] = $_POST['file'];

}




// Get Parents Categories

if (isset($_POST['type']) &&  $_POST['type'] == 'prntCat') {
$all_terms = array();
$taxonomy = 'directorypress-category';
$args = array(
        "hide_empty" => 0,
        "hierarchical" => 1,
        "taxonomy"=> $taxonomy,
        "parent" => 0
    );

    $categories = get_categories($args);
    
    foreach ($categories as $category) {
                //echo "<li>".$category->cat_name."</li>";
                $term_image = get_term_meta( $category->cat_ID, 'directorypress_category_icon', true);
                $cat = array("id" => $category->cat_ID , "name" => $category->cat_name, "img" => $term_image);
                //$arrTojs= json_encode($cat);
                array_push($all_terms,$cat);
        
    }
$response['arr'] = $all_terms;
}


if (isset($_POST['type']) &&  $_POST['type'] == 'allCat') {

$categories = get_categories( array(
    'order' => 'ASC',
        'hide_empty' => false,
    "taxonomy"=>'directorypress-category'
) );
$all_terms = array();
foreach( $categories as $category ) {
   // echo $category->cat_name;
    $cat = array("id" => $category->cat_ID , "name" => $category->cat_name);
    array_push($all_terms,$cat);
} 
$response['arr'] = $all_terms;
}

//send the response
echo json_encode($response);