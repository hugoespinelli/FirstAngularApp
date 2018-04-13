(function() {

  angular.module("primeiraApp").controller('BillingCycleCtrl', [
    '$http',
    '$location',
    'msgs',
    'tabs',
    BillingCycleController
  ])

  function BillingCycleController($http, $location, msgs, tabs) {
    const vm = this
    const url = 'http://localhost:3003/api/billingCycles'

    vm.refresh = () => {
      const limit = 5
      const page = parseInt($location.search().page) || 1
      $http.get(`${url}/?skip=${ (page-1) * limit }&limit=${ limit }`).then( (response) => {
        vm.billingCycle = {credits: [{}], debts: [{}]}
        vm.billingCycles = response.data
        vm.calculateValues();
        tabs.show(vm, {tabList: true, tabInclude: true})

        $http.get(`${url}/count`).then( (response) => {
          let pages = 1;
          pages = Math.ceil(response.data.value / limit);
          vm.pages = [];
          for (var i = 0; i < pages; i++) {
            let isCurrent = false;
            if(page == i+1){
              isCurrent = true;
            }
            vm.pages.push({value: i+1, link: `/#!/billingCycles?page=${i+1}`, isCurrent})
          }
        })
      })
    }

    vm.create = () => {

      $http.post(url, vm.billingCycle).then( (response) => {
        vm.refresh()
        msgs.addSuccess('Operacao realizada com sucesso!')
      }).catch( (response) => {
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = (billingCycle) => {
      vm.billingCycle = billingCycle
      tabs.show(vm, {tabUpdate: true})
      vm.calculateValues();
    }

    vm.showTabDelete = (billingCycle) => {
      vm.billingCycle = billingCycle
      tabs.show(vm, {tabDelete: true})
      vm.calculateValues();
    }

    vm.delete = () => {
      const deleteUrl = `${url}/${vm.billingCycle._id}`;
      $http.delete(deleteUrl, vm.billingCycle).then( (response) => {
        vm.refresh()
        $location.url('/billingCycles')
        msgs.addSuccess('Ciclo Excluido com sucesso!')
      }).catch( (response) => {
        msgs.addError(response.data.errors)
      })
    }

    vm.update = () => {
      const updateUrl = `${url}/${vm.billingCycle._id}`;
      $http.put(updateUrl, vm.billingCycle)
        .then( (response) => {
          vm.refresh();
          msgs.addSuccess("Ciclo atualizado com sucesso!")
        }).catch( (response) => {
          msgs.addError(response.data.errors)
        })
    }

    vm.addList = (index, cycle) => {
      vm.billingCycle[cycle].splice(index + 1, 0, {})
    }

    vm.cloneList = (index, {name, value}, cycle) => {
      vm.billingCycle[cycle].splice(index + 1, 0, {name, value})
      vm.calculateValues();
    }

    vm.deleteList = (index, cycle) => {
      if(vm.billingCycle[cycle].length > 1) {
        vm.billingCycle[cycle].splice(index, 1)
        vm.calculateValues();
      }
    }

    vm.calculateValues = () => {
      vm.credit = 0;
      vm.debt = 0;

      if(vm.billingCycle) {
        vm.billingCycle.credits.forEach( ({value}) => {
          vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
        })

        vm.billingCycle.debts.forEach( ({value}) => {
          vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
        })
      }

      vm.total = vm.credit - vm.debt
    }

    vm.refresh()
  }

})()
