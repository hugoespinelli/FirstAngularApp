(function() {
  angular.module('primeiraApp').factory('tabs', [ TabsFactory ])

  function TabsFactory() {

    function show(owner, {
      tabList = false,
      tabInclude = false,
      tabUpdate = false,
      tabDelete = false
    }) {
      owner.tabList = tabList
      owner.tabInclude = tabInclude
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete
    }

    return { show }
  }
}) ()
