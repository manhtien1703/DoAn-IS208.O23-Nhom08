// customUploadAdapter.js
class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initListeners(resolve, reject, file);
          this._readFile(file);
        })
    );
  }

  _initListeners(resolve, reject, file) {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ default: reader.result });
    };
    reader.onerror = (error) => reject(error);
  }

  _readFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }
}

export default function CustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };
}
