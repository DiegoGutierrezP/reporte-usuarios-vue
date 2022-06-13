<template>
  <div class="reportes-page">
    <h1>Reportes de Usuarios</h1>
    <div class="content-options">
      <button v-show="!form" @click="abrirFormRegistro()" class="btn-generar-reporte">
        Generar Reporte
      </button>
      <div v-show="response.open" class="alert success-alert">
        <h5>{{ response.msg }}</h5>
        <i class="fa-solid fa-xmark close" v-on:click="cerrarAlert()"></i>
      </div>
    </div>
    <div v-show="form">
      <FormReporte
        v-on:recargar-tabla="recargarTabla($event)"
        v-on:cerrar-form="form = false"
      />
    </div>
    <div v-if="showInfo">
        <InfoReporte v-bind:report="infoReport" v-on:cerrar-info="cerrarInfoReport()" />
    </div>
    <TablaReportes
      v-bind:reports="reports"
      v-on:show-report="showInfoReport($event)"
    />
  </div>
</template>

<script>
import TablaReportes from "@/components/TablaReportes.vue";
import FormReporte from "@/components/FormReporte.vue";
import InfoReporte from "@/components/InfoReporte.vue";
export default {
  name: "ReportesPage",
  components: {
    TablaReportes,
    FormReporte,
    InfoReporte
},
  data() {
    return {
      form: false,
      showInfo:false,
      reports: [],
      response: {
        msg: "",
        open: false,
      },
      infoReport:{}
    };
  },
  mounted() {
    this.listarReportes();
  },
  methods: {
    async listarReportes() {
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        let res = await fetch(`http://tkambio.test/api/list-reports`, options),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        this.reports = json.data;
        //console.log(this.reports)
      } catch (err) {
        console.log(err);
        this.reports = [];
      }
    },
    async getReportXId(idReport) {
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      try {
        let res = await fetch(`http://tkambio.test/api/get-report/${idReport}`, options);
        
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        let json = await res.json();
       
        Object.assign(this.infoReport,json.data);
        
      } catch (err) {
        console.log(err);
        this.infoReport = {};
      }
    },
    abrirFormRegistro(){
        this.form = true
        this.showInfo = false
    },
    recargarTabla(msg) {
      this.listarReportes();
      this.response.msg = msg;
      this.response.open = true;
    },
    cerrarAlert() {
      this.response.msg = "";
      this.response.open = false;
    },
    showInfoReport(report) {
      this.getReportXId(report);
       this.showInfo = true;
       scrollTo({
        top:30,
        behavior:'smooth'
       })
    },
    cerrarInfoReport(){
        this.showInfo = false;
        //this.infoReport = {};
    }
  },
};
</script>

<style scoped>
.reportes-page {
  padding: 0 15%;
}
h1 {
  font-weight: 700;
  font-size: 3rem;
  color: #fff;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.5);
  margin: 3rem 0;
}
.content-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.btn-generar-reporte {
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  background: #ffbe12;
  color: #fff;
  cursor: pointer;
}
.btn-generar-reporte:hover {
  opacity: 0.9;
}
.alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  background: #a8f0c6;
  padding: 10px 20px;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.alert .close {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0.5;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  right: 10px;
  text-align: center;
  cursor: pointer;
}
@media (max-width: 1200px) {
  .reportes-page {
    padding: 0 5%;
  }
}
@media (max-width: 768px) {
  .reportes-page {
    padding: 0 2%;
  }
}
</style>
