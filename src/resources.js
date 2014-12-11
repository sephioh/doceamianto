Resources = Backbone.Model.extend({
	
	defaults: {
		imagesFolder : "web/images/",
		audioFolder : "web/audio/",
		
		// interface elements
		interfc_keys : {
			'sprites' : {
				'interface_keys.png' : {
					'tile' : 54,
					'tileh' : 43,
					'map': {
						'LEFT_ARROW_up_sprite' : [0,0],
						'UP_ARROW_up_sprite' : [1,0],
						'RIGHT_ARROW_up_sprite' : [2,0],
						'DOWN_ARROW_up_sprite' : [3,0],
						'SPACE_up_sprite' : [4,0],
						'FULL_SCREEN_up_sprite' : [5,0],
						'LEFT_ARROW_down_sprite' : [0,1],
						'UP_ARROW_down_sprite' : [1,1],
						'RIGHT_ARROW_down_sprite' : [2,1],
						'DOWN_ARROW_down_sprite' : [3,1],
						'SPACE_down_sprite' : [4,1],
						'FULL_SCREEN_down_sprite' : [5,1]
					}
				}
			}
		},
		interfc_keys_relative_coordinates : {
		  	'SPACE' : { x: 216, y: 43 },
			'LEFT_ARROW' : { x: 162, y: 43 },
			'UP_ARROW' : { x: 108, y: 86 },
			'RIGHT_ARROW' : { x: 54, y: 43 },
			'DOWN_ARROW' : { x: 108, y: 43 },
			'FULL_SCREEN' : { x: 40, y: 192 }
		},
		
		// declaration of scenes' elements
		start_screen: {
			'sprites' : {
				'sheet_start_diamond.png': {
					'tile' : 64,
					'tileh' : 85,
					'map': {
						'start_diamond' : [0, 0]
					}
				}
			},
			'audio' : {
				'diamondshine' : [
				      'startdiamondshine.ogg',
				      'startdiamondshine.aac'
				]
			}
		},
		
		level01: {
			'sprites' : {
				'sheet_amianto01.png' : {
					'tile' : 94,
					'tileh' : 114,
					'map': {
						'amianto01' : [0, 0]
					}
				},
				'redheart.png' : {
					'tile' : 144,
					'tileh' : 128,
					'map': {
						'redHeart' : [0, 0]
					}
				},
				'darkheart.png' : {
					'tile' : 144,
					'tileh' : 128,
					'map': {
						'darkHeart' : [0, 0]
					}
				},
				'gradient-level01.png' : {
					'tile' : 400,
					'tileh' : 300,
					'map': {
						'gradient01' : [0, 0]
					}
				},
				'amiantoShadow01.png' : {
					'tile' : 164,
					'tileh' : 114,
					'map': {
						'amianto01Shadow' : [0, 0]
					}
				}
			},
			'audio' : {
				'theme01' : 
					['theme01.ogg',
					  'theme01.aac'
					],
				'hitredheart' : 
					['hitredheart.aac',
					  'hitredheart.ogg',
					  'hitredheart.mp3' 
					],
				'hitdarkheart' : 
					['hitdarkheart.aac',
					  'hitdarkheart.ogg',
					  'hitdarkheart.mp3'
					],
				'fall' : 
					['fall01.aac',
					  'fall01.ogg',
					  'fall01.mp3'
					]
			}
		},
		level02: {
			'sprites' : {
				'sheet_amianto02.png' : {
					'tile' : 94,
					'tileh' : 126,
					'map': {
						'amianto02' : [0, 0],
						'diamond1' : [0, 2],
						'diamond2' : [0, 3],
						'diamond3' : [0, 4],
						'diamond4' : [0, 5],
						'diamond5' : [0, 6],
						'diamond6' : [0, 7],
						'diamond7' : [0, 8],
						'diamond8' : [0, 9],
						'diamond9' : [0, 10]
					}
				},
				'obstacle.png' : {
					'tile' : 73,
					'tileh' : 136,
					'map': {
						'obstacle' : [0, 0]
					}
				},
				'explosion-sheet.png' : {
					'tile' : 240,
					'tileh' : 180,
					'map': {
						'colorExplosion' : [0, 0]
					}
				},
				'amiantotoblanche.png' : {
					'tile' : 184,
					'tileh' : 164,
					'map': {
						'amiantotoblanche' : [0, 0]
					}
				}
			},
			'images' : ['tileset-level02.png'],
			'audio' : {
				'theme02' : 
					['theme02.ogg',
					  'theme02.aac'
					],
				'diamondgrow' :
					['diamondgrow.ogg',
					  'diamondgrow.mp3',
					],
				'ohthelight' : 
					['ohthelight.ogg',
					  'ohthelight.mp3'
					]
			}
		},
		level03: {
			'sprites' : {
				'level03-corners.png': {
					'tile' : 100,
					'tileh' : 100,
					'map': {
						'cornerUpLeft': [1, 1],
						'cornerUpRight': [1, 0],
						'cornerDownLeft': [0, 1],
						'cornerDownRight': [0, 0]
					}
				},
				'sheet_amianto03.png': {
					'tile' : 78,
					'tileh' : 96,
					'map': {
						'amianto03' : [0, 0]
					}
				},
				'level03-wordplaceholder.png': {
					'tile' : 80,
					'tileh' : 80,
					'map': {
						'wordplaceholder' : [0, 0]
					}
				}
			},
			'images' : ['level03-background.png',
				'level03-ornament.png'],
			'audio' : {
				'theme03' : 
				      ['theme03.ogg',
					'theme03.aac'
				      ],
				'wordfit' : ['wordfit.ogg',
				      'wordfit.aac',
				      'wordfit.mp3'
				],
				'tilt' : ['tilt.ogg',
				      'tilt.aac',
				      'tilt.mp3'
				]
			}
		},
		level04: {
			'sprites' : {
				'sheet_carlos.png' : {
					'tile' : 140,
					'tileh' : 128,
					'map': {
						'carlos' : [0, 0],
						'carlos_phantom': [0, 5]
					}
				},
				'sheet_figurants04.png': {
					'tile' : 106,
					'tileh': 123.333333333,
					'map': {
						'figurant0': [0,1],
						'figurant1': [0,3],
						'figurant2': [0,5],
						'figurant3': [0,7],
						'figurant4': [0,9],
						'figurant5': [0,11]
					}
				},
				'sheet_policemen.png': {
					'tile' : 120,
					'tileh': 124,
					'map': {
						'policeman0': [0,0],
						'policeman1': [0,4],
						'policeman2': [0,8],
					}
				  
				},
				'sheet_lil_phantom.png': {
					'tile' : 124,
					'tileh': 114,
					'map': {
						'lil_phantom': [0,0]
					}
				},
				'sheet_badass_phantom.png': {
					'tile' : 170,
					'tileh': 170,
					'map': {
						'badass_phantom': [0,0]
					}
				},
				'sheet_waterfall.png': {
					'tile' : 52,
					'tileh': 123,
					'map': {
						'water_fall': [0,0]
					}
				},
				'sheet_watersplash.png': {
					'tile' : 64,
					'tileh': 40,
					'map': {
						'water_splash': [0,0]
					}
				}
			},
			'images': ['tileset-level04.png',
				'bg1-level04-0.png',
				'bg1-level04-1.png',
				'bg1-level04-2.png',
				'bg1-level04-3.png',
				'bg1-level04-4.png',
				'bg1-level04-5.png',
				'bg1-level04-6.png',
				'bg1-level04-7.png',
				'bg1-level04-8.png',
				'bg1-level04-9.png',
				'bg1-level04-10.png',
				'bg1-level04-11.png',
				'bg1-level04-12.png',
				'bg1-level04-13.png',
				'bg1-level04-14.png',
				'bg1-level04-15.png',
				'bg1-level04-16.png',
				'bg1-level04-17.png',
				'bg1-level04-18.png',
				'bg1-level04-19.png',
				'bg2-level04-0.png',
				'bg2-level04-1.png',
				'bg2-level04-2.png',
				'bg2-level04-3.png',
				'bg2-level04-4.png',
				'bg2-level04-5.png',
				'bg2-level04-6.png',
				'bg2-level04-7.png',
				'bg2-level04-8.png',
				'bg2-level04-9.png',
				'bg2-level04-10.png',
				'bg2-level04-11.png',
				'bg2-level04-12.png',
				'bg2-level04-13.png',
				'bg2-level04-14.png',
				'bg2-level04-15.png',
				'bg2-level04-16.png',
				'bg2-level04-17.png',
				'bg2-level04-18.png',
				'bg2-level04-19.png',
				'bg3-level04.png'
			],
			'audio' : {
				'theme04' : 
				      ['theme04.ogg',
					'theme04.aac'
				      ],
				'rifleshot' : 
				      ['rifleshot.ogg',
					'rifleshot.aac',
					'rifleshot.mp3',
				      ],
				'pistolshot' : 
				      ['pistolshot.ogg',
					'pistolshot.aac',
					'pistolshot.mp3',
				      ],
				'phantomboss':
				      ['phantomboss.ogg',
					'phantomboss.aac'
				      ],
				'phantomrag':
				      ['phantomrag.ogg',
					'phantomrag.aac',
					'phantomrag.mp3',
				      ]
			}
		},
		level05: {
			'sprites' : {
				'sheet_amianto05.png': {
					'tile' : 90,
					'tileh': 122,
					'map': {
						'amianto05': [0,0]
					}
				},
				'sheet_nightclub_phantom.png': {
					'tile' : 38,
					'tileh': 40,
					'map': {
						'nightclub_phantom': [0,0]
					}
				},
				'gradient-level05.png': {
					'tile' : 600,
					'tileh': 450,
					'map': {
						'gradient05': [0,0]
					}
				}
			},
			'images': ["tileset-level05.png"],
			'audio' : {
				'theme05': [
					'theme05.ogg',
					'theme05.aac'
				],
				'shiwsish': [
					'shiwsish.ogg',
					'shiwsish.aac',
					'shiwsish.mp3'
				],
				'phantomrag': [
					'phantomrag.ogg',
					'phantomrag.aac',
					'phantomrag.mp3',
				]
			}
		},
		level06: {
			'sprites' : {
				'sheet_amianto06.png' : {
					'tile' : 50,
					'tileh' : 68,
					'map' : {
						'amianto06': [0,0]
					}
				},
				'sheet_stairway.png' : {
					'tile' : 332,
					'tileh' : 306,
					'map' : {
						'stairway': [0,0]
					}
				},
				'redheart.png' : {
					'tile' : 144,
					'tileh' : 128,
					'map' : {
						'redHeart' : [0, 0]
					}
				},
				'darkheart.png' : {
					'tile' : 144,
					'tileh' : 128,
					'map' : {
						'darkHeart' : [0, 0]
					}
				},
				'sheet_stair_mask.png' : {
					'tile' : 79,
					'tileh' : 190,
					'map' : {
						'stairColumnMask' : [0, 0]
					}
				},
				'sheet_couple_kissing.png' : {
					'tile' : 60,
					'tileh' : 56,
					'map' : {
						'coupleKissing' : [0, 0]
					}
				},
				'sheet_nightclub_phantom.png' : {
					'tile' : 38,
					'tileh': 40,
					'map': {
						'nightclub_phantom': [0,0]
					}
				},
				'sheet_credits.png' : {
					'tile' : 112,
					'tileh': 104,
					'map': {
						'coupleCredits': [0,0]
					}
				},
				'sheet_fireworks.png' : {
					'tile' : 397,
					'tileh': 600,
					'map': {
						'fireworks': [0,0]
					}
				},
				'moon.png' : {
					'tile' : 1121,
					'tileh': 1200,
					'map': {
						'moon': [0,0]
					}
				},
			},
			'images': ["bg_sky_level06.png",
				"bg_skyline_level06.png",
				"sheet_blue_numbers.png",
				"sheet_red_numbers.png"
			],
			'audio' : {
				'theme06': [
					'theme06.ogg',
					'theme06.aac'
				],
				'hitredheart': [
					'hitredheart.ogg',
					'hitredheart.aac',
					'hitredheart.mp3'
				],
				'hitdarkheart': [
					'hitdarkheart.ogg',
					'hitdarkheart.aac',
					'hitdarkheart.mp3'
				],
				'phantomrag': [
					'phantomrag.ogg',
					'phantomrag.aac',
					'phantomrag.mp3',
				],
				'kiss0': [
					'kiss0.ogg',
					'kiss0.aac',
					'kiss0.mp3',
				],
				'kiss1': [
					'kiss1.ogg',
					'kiss1.aac',
					'kiss1.mp3',
				],
				'kiss2': [
					'kiss2.ogg',
					'kiss2.aac',
					'kiss2.mp3',
				]
			}
		}
	},
	    
	initialize: function(){
		
	}
      
});