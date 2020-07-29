let image = null;
let _URL = window.URL || window.webkitURL;

export const measureImage = (file) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      image = image || new Image();
      image.src = e.target.result;
      image.onload = () => {
        resolve({
          width: image.width,
          height: image.height,
        });
      };
      image.onerror = () => {
        reject(new Error("加载图片文件失败"));
      };
    };
  });
};

export const measureImageUseObjectUrl = (file) => {
  const objectUrl = _URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    image.onload = () => {
      // 释放 URL 对象
      _URL.revokeObjectURL(objectUrl);
      resolve({
        width: image.width,
        height: image.height,
      });
    };

    image.onerror = () => {
      _URL.revokeObjectURL(objectUrl);
      reject(new Error("加载图片文件失败"));
    };

    image.src = objectUrl;
  });
};
