<template>
    <form ref="uploader" enctype="multipart/form-data" @submit="$event.preventDefault()">
        <!-- CI DESSUS, ATTRIBUT REF => SIMILAIRE POUR SELECTIONNER
          document.querySelector("#uploader") ||
          this.$el.querySelector("uploader") || 
          this.$refs.uploader ... avec $refs, on accède directement à l'objet du DOM (virtuel)
        -->
        <input type="file" id="file_picker" ref="filePicker" :multiple="multiple === true || null" @change="getLocalFiles($event.target.files)">
        <span @click="doClick()" id="icon">Parcourir</span>
        <!-- <button id="btn" :disabled="!files.length" class="btn">upload</button> -->
    </form>
</template> 
<script>
import axios from "axios";
export default {
  data() {
    return {
    }
  },
  methods: {
    doClick() {
      this.$refs.filePicker.click();
    },
    checkFilesExtensions([...files]) {
      var errors = 0;
      const log = [];

      files.forEach(file => {
        if (!this.mimes.includes(file.type)) {
          errors += 1;
          if (!log.includes(file.type)) {
            log.push(file.type);
          }
        }
      });
      return {
        errors: errors !== 0,
        log: log
      };
    },
    getLocalFiles(files) {
      // console.log("files", files);
      const check = this.checkFilesExtensions(files);
      if (!check.errors) {
        this.$parent.$emit('upload', files)
      } else {
        console.error("file-type not allowed >", check.log);
      }
    }
  },
  props: ["mimes", "multiple"]
};
</script>

<style>
.title {
  margin-top: 0;
}
#file_picker {
  display: none;
}
#icon {
  font-size: 2rem;
  font-weight: 600;
  cursor: pointer;
}
#icon:hover {
  color: #b2224b;
}
</style>
