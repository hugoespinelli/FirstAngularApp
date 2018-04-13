angular.module('primeiraApp').constant('consts', {
  appName: 'MEAN - Primeira aplicacao',
  version: '1.0',
  owner: 'Hugo',
  year: '2018',
  apiUrl: 'http://localhost:3003/api',
  oapiUrl: 'http://localhost:3003/oapi',
  userKey: '_primeira_app_user'
}).run(['$rootScope', 'consts', ($rootScope, consts) => {
  $rootScope.consts = consts
}])
