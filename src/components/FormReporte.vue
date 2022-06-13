<template>
  <div class="content-form">
    <form @submit="submirGenerateReport">
      <div class="form-group">
        <label>Titulo: *</label>
        <input type="text" v-model="form.title" placeholder="Titulo del reporte" />
        <small>{{errors.title}}</small>
      </div>

      <div class="content-dates">
        <div class="form-group">
          <label>Desde: *</label>
          <input type="date" v-model="form.startDate" min="1980-01-01" v-bind:max="form.endDate" />
          <small>{{errors.startDate && errors.startDate}}</small>
        </div>
        <div class="form-group">
          <label>Hasta: *</label>
          <input type="date" v-model="form.endDate" v-bind:min="form.startDate"  />
          <small>{{errors.endDate && errors.endDate}}</small>
        </div>
      </div>
      <br />
      <div class="content-btn">
        <input class="btn-generar" type="submit" value="Generar" />
        <input
          @click="cancelarRegistro()"
          class="btn-cancelar"
          type="button"
          value="Cancelar"
        />
      </div>
    </form>
  </div>
</template>

<script>

   export default {
       name:'FormReporte',
       data() {
        return{
           form:{
            title:'',
            startDate:'',
            endDate:''
           },
           errors:{}
        }
       },
       methods:{
            cancelarRegistro(){
                this.form.title='';this.form.startDate='';this.form.endDate='';
                this.errors={};
                this.$emit('cerrarForm');
            },
            submirGenerateReport(e){
                e.preventDefault();
                this.errors = this.validateForm();
                if(Object.keys(this.errors).length === 0){
                  this.registrarReporte();
                  this.cancelarRegistro();
                }
            },
            validateForm(){
                let errors ={};
                if(!this.form.title.trim()){
                    errors.title = 'Escriba un titulo para el reporte'
                }
                if(!this.form.startDate.trim()){
                    errors.startDate = 'Escoja la fecha de inicio'
                }
                if(!this.form.endDate.trim()){
                    errors.endDate = 'Escoja la fecha de fin'
                }

                return errors;
            },
            async registrarReporte(){
              let options = {
                method: "POST",
                body:JSON.stringify({
                  title:this.form.title,
                  start:this.form.startDate,
                  end:this.form.endDate
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              };
              try{
                let res = await fetch(`http://tkambio.test/api/generate-report`,options);
                if (!res.ok) throw { status: res.status, statusText: res.statusText };

                let json = await res.json();
                //console.log(json);
                this.$emit('recargarTabla',json.msg);
                
              }catch(err){
                console.log(err);
              }
            }
       }
   }
</script>

<style scoped>
.content-form {
  margin: 1rem 0;

}
form {
  background: #fff;
  width: 500px;
  padding: 15px;
  position: relative;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  transition: 0.3s;
}
label {
  text-align: left;
}
.form-group input {
  display: block;
  font-size: 1rem;
  padding: 10px 15px;
  border: none;
  background: #dfdfdf;
  border-radius: 5px;
}
.form-group input:focus {
  outline: none !important;
  border: 1px solid #ffbe12;
}
.form-group small{
    color: red;
    text-align: left;
    padding-top: 5px;
}

.content-dates {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
}
.content-dates .form-group {
  width: 45%;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.content-btn {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  margin: 0.4rem 0;
}
.content-btn input {
  padding: 10px 15px;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  /* background: #FFBE12; */
  color: #fff;
  cursor: pointer;
}
.content-btn .btn-generar {
  background: #ffbe12;
}
.content-btn .btn-cancelar {
  background: #a5a5a5;
  color: #fff;
}
.content-btn input:hover {
  opacity: 0.9;
}
@media (max-width:768px){
    form{
        width: 100%;
    }
}
</style>
