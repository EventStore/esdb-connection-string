<template>
  <el-form label-width="240px">
    <el-form-item label="Connection string:">
      <el-col :span="20">
        <el-input
                placeholder="Fill out the form on the connection details page or enter manually"
                v-model="connectionString"
        />
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
    name:     "ConnectionString",
    computed: {
        connectionString: {
            get() {
                return this.$store.state.codeBlocks.connectionString;
            },
            set(v) {
                this.$store.commit(SubmitCodeBlock, {key: "connectionString", value: v});
            }
        }
    },
}
</script>
