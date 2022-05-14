<template>
  <div style="display: flex; flex-direction: row; height: 100%">
    <div style="background-color: #0000; padding: 2rem"></div>
    <div style="overflow: hidden; flex-grow: 1">
      <ag-grid-vue
        id="CoursesTable"
        class="ag-theme-balham-dark"
        style="height: 100%; width: 100%;"
        :columnDefs="columnDefs"
        :rowData="grades"
        @grid-ready="onGridReady"
      />
    </div>
    <div style="background-color: #0000; padding: 2rem"></div>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import { mapState } from 'vuex'

export default {
  components: {
    AgGridVue
  },
  setup() {
    return {
      columnDefs: [
        { headerName: "Test", sortable: true, field: "test_id" },
        { headerName: "Course", sortable: true, filter: true, field: "course_id" },
        { headerName: "Grade", sortable: true, field: "grade" }
      ],
      gridApi: null,
      gridColumnApi: null
    }
  },
  computed: {
    ...mapState('account', ['grades'])
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi

      params.api.sizeColumnsToFit()
      window.addEventListener('resize', () => {
        setTimeout(() => {
          params.api.sizeColumnsToFit()
        })
      })

      params.api.sizeColumnsToFit()
    }
  }
}
</script>

<style lang="scss">
@import "~ag-grid-community/dist/styles/ag-grid.css";
@import "~ag-grid-community/dist/styles/ag-theme-balham-dark.css";
</style>