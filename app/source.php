<?php
$page = <<<test
define([
    'backbone',
    'backbone.transformable'], function(Backbone){
    var Shape = Backbone.RaphaelTransformableModel.extend({
        type: 'rectangle'
    });
    return Shape;
});
test;


$testFile = array('id' => 1, 'code' => $page);
$testFile2 = array('id' => 2, 'code' => 'def');

$sources = array($testFile,$testFile2);

//echo 'Content-Type: text/json';
echo json_encode($sources);

