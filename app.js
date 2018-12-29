const express = require('express');
const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
const site = require('./resources/private-package/leoCMS');

app.get('/', (req, res) => {
	let strMenuPages = "";
	for (let i = 0; i < site.pages.length; i++) {
		let page = site.pages[i];
		strMenuPages += '<li><a href="/' + encodeURI(page.textuals[0].title) + '">' + page.textuals[0].title + '</a></li>';
	}
	// TODO: install an HTML templating engine
	res.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<title>homepage</title>
			</head>
			<body>			
				<ul>` + strMenuPages + `</ul>			
			</body>
		</html>
	`)
});

app.get('/page/:id', (req, res) => {
	let page = site.pages.filter(p => p.id == parseInt(req.params.id))[0];
	res.send(JSON.stringify(page));
});
app.get('*', function (req, res) {
	let title = decodeURI(req.url).replace('/', '');
	console.log(title);

	let page = site.pages.filter(p => p.textuals[0].title == title)[0];
	if (page) {
		// TODO: find real redirect that not change url
		res.writeHead(301, { 'Location': 'http://localhost:3000/page/' + page.id });
		res.end();
	} else
		res.send('what???', 404);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*

Page = {										// rappresent one route of site
	id: 'key',                      			//
	externalId: 'guid',             			// Id di accesso esterno alla risorsa
	template: 'string',               			// tipo di rendering della pagina
	order: 'number',							//
	languageCode: 'string',         			//
	textuals : [                    			//
		{                           			//
			id: 'key',              			//
			order: 'number',					//
			languageCode: 'string', 			//
			title: 'string',        			//
			subtitle: 'string',     			//
			description: 'string'   			//
		}                           			//
	],		                        			//
	attachments : [                 			//
		{                           			//
			id: 'key',              			//			
			order: 'number',					//
			languageCode: 'string', 			// like 'IT-it' end one code is 'Global'
			title: 'string',        			//
			description: 'string',  			// 
			src: 'string'           			// image content
			href: 'string'						//
		}
	],
	links : [ idl1, idl2, idl3, idl4 ],
	components : [ idc1, idc2, idc3, idc4]
};

Component : {
	id: 'key',                                 	//
	externalId: 'guid',                        	// accesso esterno al componente
	template: 'string',                        	// tipo visualizzazione componente
	order: 'number',						   	//
	languageCode: 'string',         			//
	textualElements : [						   	//
		{                                      	//
			id: 'key',                         	//
			order: 'number',				   	//
			languageCode: 'string',            	//
			title: 'string',                   	//
			subtitle: 'string',                	//
			description: 'string'              	//
		}                                      	//
	],		                                   	//
	attachments : [                            	//
		{                                      	//
			id: 'key',                         	//
			order: 'number',				   	//
			languageCode: 'string',            	// like 'IT-it' end one code is 'Global'
			title: 'string',                   	//
			description: 'string',             	// 
			src: 'string'                      	// image content
			href: 'string'						// 
		}
	],
	links : [ id1, id2, id3, id4 ]
};

Link : [                                  
	{                                      
		id: 'key',                          
		languageCode: 'string',             
		label: 'string',                   		// text of link  
		title: 'string',                   		// title attribute
		href: 'string',                    		// link tag a
		src: 'string'                      		// image content of link
	}                                      
];
PageTemplates [
	'Textual',
	'ComponentsList',
	'ComponentDetail',
	'Home'
];
LanguageCode = [
	'Global',
	'IT-it',
	'EN-en'
];

*/