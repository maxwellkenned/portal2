(function(angular) {
    'use strict';
    angular.module('FileManagerApp').provider('fileManagerConfig', function() {

        var values = {
            appName: 'angular-filemanager v1.5',
            defaultLang: 'pt',

            listUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            uploadUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            renameUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            copyUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            moveUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            removeUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            editUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            getContentUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            createFolderUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            downloadFileUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            downloadMultipleUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            compressUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            extractUrl: '/vendor/angular-filemanager/bridges/php/handler.php',
            permissionsUrl: '/vendor/angular-filemanager/bridges/php/handler.php',

            searchForm: true,
            sidebar: true,
            breadcrumb: true,
            allowedActions: {
                upload: true,
                rename: true,
                move: true,
                copy: true,
                edit: true,
                changePermissions: true,
                compress: true,
                compressChooseName: true,
                extract: true,
                download: true,
                downloadMultiple: true,
                preview: true,
                remove: true,
                createFolder: true,
                pickFiles: false,
                pickFolders: false
            },

            multipleDownloadFileName: 'angular-filemanager.zip',
            showExtensionIcons: true,
            showSizeForDirectories: false,
            useBinarySizePrefixes: false,
            downloadFilesByAjax: true,
            previewImagesInModal: true,
            enablePermissionsRecursive: true,
            compressAsync: false,
            extractAsync: false,
            pickCallback: null,

            isEditableFilePattern: /\.(txt|diff?|patch|svg|asc|cnf|cfg|conf|html?|.html|cfm|cgi|aspx?|ini|pl|py|md|css|cs|js|jsp|log|htaccess|htpasswd|gitignore|gitattributes|env|json|atom|eml|rss|markdown|sql|xml|xslt?|sh|rb|as|bat|cmd|cob|for|ftn|frm|frx|inc|lisp|scm|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb|tmpl|lock|go|yml|yaml|tsv|lst)$/i,
            isImageFilePattern: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
            isExtractableFilePattern: /\.(gz|tar|rar|g?zip)$/i,
            tplPath: 'src/templates'
        };

        return {
            $get: function() {
                return values;
            },
            set: function (constants) {
                angular.extend(values, constants);
            }
        };

    });
})(angular);
