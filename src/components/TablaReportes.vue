<template>
  <div class="table-report">
    <div class="table-header">
      <div class="search-content">
        <input type="search" v-model="search"  placeholder="Buscar" />
      </div>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Titulo</th>
            <th>Fecha Registro</th>
            <th width="50px" ></th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="table-body">
      <table>
        <tbody v-if="reports2.length > 0">
          <tr  v-for="report in reports2" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.title }}</td>
            <td>{{formatDate(report.created_at)}}</td>
            <td width="80px"  ><button class="btn-eye" v-on:click="this.$emit('showReport',report.id)"  ><i class="fa-solid fa-eye"></i></button></td>
          </tr>
        </tbody>
        <tbody v-else >
          <tr>
            <td colspan="4" style="text-align:center; font-size:1rem;padding:2rem 0;">No hay registros que mostrar</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { formatDateTimeShow } from '@/helpers/dates';

export default {
  name: "TablaReportes",
  props:{
    reports:Array
  },
  data() {
    return {
      formatDate:formatDateTimeShow,
      filterData:[],
      searchFilter:''
    };
  },
  computed:{
    reports2:{
      get(){
        return this.searchFilter.length === 0 ?  this.reports : this.filterData ;
      },
      set(newValue){
        this.filterData = newValue;
      }
    },
    search:{
      get() {
        return this.searchFilter
      },
      set(newValue) {
        this.searchFilter = newValue;
        if(!newValue.trim()){
          this.reports2 = this.reports
        }else{
          let arr = this.reports.filter(function(el) {
              return el.title.toLowerCase().indexOf(newValue.toLowerCase()) > -1;
          });
          this.reports2 = arr;
        }
        
      }
    }
  },
  mounted(){
    console.log(this.reports)
  },
  methods: {
    filerData(){
      console.log('asds')
    },

  },
};
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  transition: .3s;
}
.table-header {
  background-color: #dfdfdf;
  border-radius: 10px 10px 0 0;
}
.table-body {
  height: 400px;
  overflow-x: auto;
  margin-top: 0;
  border: 1px solid #dfdfdf;
  background: #fff;
}
table tr td:nth-child(1),
table tr th:nth-child(1){
    max-width: 50px;
}
th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 700;
  text-transform: uppercase;
  
}
td {
  padding: 15px 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 15px;
    background: #fff;
    border-top: 1px solid #dee2e6;
    color: #000;
}
.btn-eye{
  padding: 10px;
  border: none;
  border-radius: 15px;
  margin:auto;
  font-size: 1rem;
  cursor: pointer;
  background: #ffbe12;
  color: #292929;
}
.btn-eye:hover{
  opacity: 0.9;
}
.search-content{
  width: 250px;
  position: relative;
  padding: 10px;
  float: right;
  padding-right: 20px;
}
.search-content input{
  padding: 8px 12px;
  width: 100%;
  border: none;
  font-size: 1rem;
  border-radius: 15px;
}
.search-content input:focus{
  outline: none !important;
  border: 1px solid #ffbe12;
}

</style>
