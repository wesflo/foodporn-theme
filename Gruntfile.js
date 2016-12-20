module.exports = function (grunt) {
    grunt.initConfig({
        srcPath: 'src',
        buildPath: 'dist',
        tmpPath: 'tmp',
        fontPath: '<%= srcPath %>/font',
        vendorPath: 'vendor',
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';',
                sourceMap: false
            },
            library: {
                files: {
                    '<%= tmpPath %>/js/<%= pkg.name %>.js': [
                        //VENDORS

                        // Project
                        '<%= srcPath %>/js/**/*.js',
                    ]
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */\n',
                sourceMap: false,
                preserveComments: false,
                compress: {
                    drop_console: true
                }
            },
            prod: {
                files: {
                    '<%= buildPath %>/js/<%= pkg.name %>.min.js': ['<%= tmpPath %>/js/<%= pkg.name %>.js']
                }
            }
        },

        sass: {
            options: {
                style: 'nested',
                sourcemap: 'none',
                quiet: true,
                update: false,
                trace: true,
                noCache: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= srcPath %>/scss',
                        src: ['*.scss'],
                        dest: '<%= tmpPath %>/css',
                        ext: '.css'
                    }
                ]
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            production: {
                files: {
                    '<%= buildPath %>/css/<%= pkg.name %>.min.css': [
                        '<%= tmpPath %>/css/reset.css',
                        '<%= tmpPath %>/css/helper.css',
                        '<%= tmpPath %>/css/layout.css',
                        '<%= tmpPath %>/css/components.css',
                        '<%= tmpPath %>/css/modules.css',
                        '<%= tmpPath %>/css/pages.css'
                    ]
                }
            }
        },

		webfont: {
			icons: {
				src: '<%= fontPath %>/svg/*.svg',
				dest: '<%= fontPath %>/files/',
				destCss: '<%= fontPath %>',
				options: {
					types: 'eot,woff,ttf,svg',
					syntax: 'bem',
					font: 'icons',
					stylesheet: 'scss',
					relativeFontPath: '../font/',
					startCodepoint: 59231,
					codepointsFile: '<%= fontPath %>/codepoints.json',
					template: '<%= fontPath %>/tmpl.css',
					htmlDemo: true,
					htmlDemoFilename: 'tmp',
					destHtml: '<%= fontPath %>/',
					templateOptions: {
						fontName: 'icons',
						baseClass: 'icon, i',
						classPrefix: 'icon_',
						mixinPrefix: 'icon_'
					}
				}
			}
		},

        symlink: {
            options: {
                overwrite: false
            },
            explicit: {
                files: [
                    {
                        src: '<%= fontPath %>/files',
                        dest: '<%= tmpPath %>/fonts/'
                    },
                    {
                        src: '<%= srcPath %>/img/',
                        dest: '<%= tmpPath %>/img/'
                    }
                ]
            }
        },

        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= srcPath %>/img',
                        src: '**',
                        dest: '<%= buildPath %>/img/'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= fontPath %>/files',
                        src: '**',
                        dest: '<%= buildPath %>/fonts/'
                    }
                ]
            }
        },

		clean: {
			fonts: {
				src: ['<%= fontPath %>/files/*'],
                options: {
                    force: true
                }
			},
			fontsTmp: {
				src: ['<%= fontPath %>/tmp.html'],
                options: {
                    force: true
                }
			}
		},

		watch: {
			scripts: {
				files: ['<%= srcPath %>/js/**/*.js', '<%= vendorPath %>/**/*.js'],
				tasks: ['concat'],
				options: {
					spawn: false
				}
			},
			css: {
				files: ['<%= srcPath %>/scss/**/*.scss'],
				tasks: ['sass']
			}
		}
	});

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('production', [
       'concat',
       'uglify:prod',
       'sass',
       'cssmin:production',
       'copy:fonts',
       'copy:images'
    ]);
    grunt.registerTask('pro', ['production']);

    grunt.registerTask('dev', ['concat', 'sass', 'watch']);

    grunt.registerTask('init', ['symlink']);

    grunt.registerTask('font', ['clean:fonts', 'webfont', 'clean:fontsTmp']);
    grunt.registerTask('fonts', ['font']);
};


