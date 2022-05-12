<template>
<div id="app">
    <el-row :gutter="20">
        <!-- gutter 栅格间距 -->

        <h1 align="center">SARU: Generate synthetic CT images for MR-only BNCT treatment planning</h1>
        <div align="center">zhaosheng@nuaa.edu.cn</div>
    </el-row>
    <el-row :gutter="20">

        <el-col :span="6" :offset="4">
            <el-image style="width: 500px; height: 80px" fit="scale-down" :src="require('/home/zhaosheng/mr2ct/nuaa.png')"></el-image>
        </el-col>

        <el-col :span="6" :offset="1">
            <el-image style="width: 500px; height: 80px" fit="scale-down" :src="require('/home/zhaosheng/mr2ct/src/assets/iint.jpg')"></el-image>
        </el-col>

    </el-row>

    <el-row :gutter="20">
        <!-- gutter 栅格间距 -->
        <el-col :span="6" :offset="4">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="url" class="image" />
                <div style="padding: 14px">
                    <span>SARU Result</span>
                    <div class="bottom clearfix">
                        <time class="time">{{ currentDate }}</time>
                        <el-button type="text" class="button">Download</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-col :span="10" :offset="0">

            <el-card shadow="hover">
                <h1 align="center">MRI to CT Online Tool 👨‍⚕️</h1>
                <el-divider></el-divider>
              <el-upload
                class="upload-demo"
                list-type="picture-card"
                align="center"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                name="file"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :headers="headers"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeProductUpload"
                :auto-upload="true">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">Drop the T1 MRI picture into here, or click <em>upload</em></div>
                <div class="el-upload__tip" slot="tip">Only jpg/png now. Please make sure your picture size is less than 500kb.</div>
              </el-upload>

                <!-- <el-upload action="/api/trans/file/" list-type="picture-card" name="file" :headers="headers" :on-success="handleAvatarSuccess" :before-upload="beforeProductUpload" :auto-upload="true">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <i class="el-icon-download"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload> -->

                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>

                <el-button type="primary" align="center" @click="onSubmit">Start!</el-button>
            </el-card>
        </el-col>
    </el-row>

</div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            Form: {
                file: [],
            },
            fileList:[],
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
            url: require('/home/limingzhu/limingzhu2022/ct_t1/SyNRA_png_0318_003/test/ct/136_10.png'),
            headers: {
                enctype: "multipart/form-data"
            },
        };
    },
    methods: {
        handleRemove(file) {
            console.log(file);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },

        handleAvatarSuccess(res,file) {
           console.log(file.url);
            //res这个参数自己打印出来一看便知，在此不做解释
            this.url=file.url;
            console.log(res);
        },

        beforeProductUpload(file) {
            var _this = this;
            return new Promise(function () {
                var reader = new FileReader();
                reader.readAsDataURL(file); // 这里是最关键的一步，转换成base64
                reader.onload = function (event) {
                    _this.Form.file.push(event.target.result); //定义参数获取图片路径
                };
                
            });
        },

        onSubmit() {
            
            const fd = new FormData();
            fd.append("file", this.Form.file[0]);
            this.$axios
                .post("/trans/base64", fd, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                })
                .then((res) => {
                    this.url = "data:image/png;base64," + res.mr_img;
                    this.$message({
                        message: 'Success ~ ',
                        type: 'success'
                    });

                });
        },
    },
};
</script>

<style>
.content {
    margin: 0 auto;
}

.el-card {
    border-radius: 30px;
    /* box-shadow: 0 2px 12px 0 rgb(243, 102, 102); */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
}

.grid-content {
    /* background: rgb(14, 214, 131); */
    border-radius: 4px;
    min-height: 80px;
}

.el-row {
    margin-bottom: 20px;
}
</style>

<style>
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>
