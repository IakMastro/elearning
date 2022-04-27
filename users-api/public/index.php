<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$pdo_elearning = new \pdo(
	"pgsql:host=sql;port=5432", 
	"elearning", 
	"1234",
		[
			\pdo::ATTR_ERRMODE			  => \pdo::ERRMODE_EXCEPTION,
			\pdo::ATTR_DEFAULT_FETCH_MODE => \pdo::FETCH_ASSOC,
			\pdo::ATTR_EMULATE_PREPARES   => false
		]
);

$app = new \Slim\App;

$app->add(new \Eko3alpha\Slim\Middleware\CorsMiddleware(
	[
		'*' => ['GET', 'POST']
	]
));

$app->get("/", function(Request $request, Response $response, array $args) {
	$response->getBody()->write("Hello World!");
	return $response;
});

$app->run();
?>
