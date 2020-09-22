
class Utils {
    /**
     * 生成文件名称
     */
    static getUploadDirName() {
        const date = new Date();
        let month = Number.parseInt(date.getMonth()) + 1;
        month = month.toString().length > 1 ? month : `0${month}`;
        const dir = `${date.getFullYear()}${month}${date.getDate()}${date.getTime()}`;
        return dir;
    }
    /**
     * 获取文件后缀
     * @param {*} name 
     */
    static getUploadFileExt(name) {
        let ext = name.split('.');
        return ext[ext.length - 1];
    }



}

module.exports = Utils;
