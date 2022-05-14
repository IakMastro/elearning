<template>
  <div style="display: flex; flex-direction: row; height: 100%">
    <div style="background-color: #0000; padding: 2rem"></div>
    <div style="overflow: hidden; flex-grow: 1">
      <ag-grid-vue
        id="CoursesTable"
        class="ag-theme-balham-dark"
        style="height: 100%; width: 100%;"
        :columnDefs="columnDefs"
        :rowData="courses"
        @grid-ready="onGridReady"
        @cell-clicked="onCellClicked"
      />
    </div>
    <div style="background-color: #0000; padding: 2rem"></div>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AgGridVue
  },
  setup() {
    return {
      columnDefs: [
        { headerName: "Course Name", sortable: true, filter: true, field: "name" },
        { headerName: "Category", sortable: true, filter: true, field: "category" },
        { headerName: "SubCategory", sortable: true, filter: true, field: "subcategory" },
        { headerName: "Tutor", sortable: true, filter: true, field: "tutor" },
        { headerName: "Tutor Id", field: "tutor_id" },
        { headerName: "Rating", sortable: true, field: "rating" }
      ],
      gridApi: null,
      gridColumnApi: null
    }
  },
  created() {
    this.getAll()
  },
  computed: {
    ...mapState('course', ['courses'])
  },
  methods: {
    ...mapActions('course', ['getAll']),
    onCellClicked(event) {
      console.log(event.data)
    },
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