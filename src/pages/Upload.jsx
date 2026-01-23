import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api_path = import.meta.env.VITE_API_PATH;

const getToken = () => 
  document.cookie.replace(/(?:(?:^|.*;\s*)creamydayToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1");
  
  export default function Upload() {
    
    const navigate = useNavigate();

    useEffect(()=>{
      (async function verifySignin(){
        const token = getToken();
        axios.defaults.headers.common["Authorization"] = token;
        try{
          const res = await axios.post(`${API_BASE_URL}/v2/api/user/check`);
      } catch(error){
        console.error("Error during token verification:", error);
        navigate("/login");
      }
    })()
  },[])

  const [product, setProduct] = useState({
    title: "",
    category: "disabled",
    origin_price: 0,
    price: 0,
    unit: "fixed",
    description: "",
    imageUrl: "",
    imagesUrl: [''],
    is_enabled: true,
    isPopular: true,
    isNew: true,
    options: [{ size: "", originPrice: "", price: "" }],
    content: [
      {
      key: "intro",
      title: "商品介紹",
      text:
        "",
      },
      {
        key: "spec",
        title: "商品規格",
        text:
          "規格：\n" +
          "成分：\n" +
          "適合人數：",
      },
      {
        key: "shipping",
        title: "配送方式與訂購須知",
        text:
          "配送方式\n冷藏宅配\n門市自取（請於備註填寫取貨日期）\n\n" +
          "付款方式\n信用卡 / Line Pay / Apple Pay\nATM 轉帳\n\n" +
          "訂購須知\n每日手作，依訂單製作\n下單後 2–3 天出貨\n生鮮食品不接受退換貨（除商品瑕疵）",
      },
      {
        key: "storage",
        title: "保存方式與賞味期限",
        text:
          "保存方式：冷藏保存\n" +
          "食用方式：食用前回溫 10 分鐘風味最佳\n" +
          "賞味期限：冷藏 2 日內最佳\n" ,
      }
    ]
  });

  const selectedSizes = product.options
    .map((option) => option.size)
    .filter((size) => size);

  return <>
    <div className="container mt-4">
      <form className="mt-5">
        <h2>上傳頁面</h2>
        {/* 分類及產品名稱 */}
        <div className="row row-cols-1 row-cols-sm-2 mt-3 g-3">
          <div className="d-flex col">
            <label htmlFor="category" className="me-2 col-form-label text-nowrap flex-shrink-0">分類</label>
            <div className="flex-grow-1">
              <select className="form-select" name="category" id="category" defaultValue={"disabled"}
                onChange={(e) => setProduct({...product, category: e.target.value})}>
                <option value="disabled" disabled>請選擇</option>
                <option value="生乳捲">生乳捲</option>
                <option value="提拉米蘇">提拉米蘇</option>
                <option value="巴斯克">巴斯克</option>
                <option value="其他甜點">其他甜點</option>
              </select>
            </div>
          </div>
          <div className="d-flex col">
            <label htmlFor="title" className="me-2 col-form-label text-nowrap flex-shrink-0">標題</label>
            <div className="flex-grow-1">
              <input id="title" type="text" className="form-control" placeholder="品名" 
                onChange={(e) => setProduct({...product, title: e.target.value})}/>
            </div>
          </div>
        </div>
        {/* 分類及產品名稱結束 */}
        {/* 商品描述 */}
        <div className="form-floating mt-3">
          <textarea className="form-control" style={{height:"100px"}} placeholder="商品描述" id="description"
            onChange={(e) => setProduct({...product, description: e.target.value})}
          ></textarea>
          <label htmlFor="description">商品描述</label>
        </div>
        {/* 商品描述結束 */}
        {/* 商品內容 */}
        <div className="row row-cols-sm-2 mt-3 g-3">
          <div className="form-floating mt-3">
            <textarea className="form-control" style={{height:"200px"}} placeholder="商品介紹" id="intro"
              onChange={(e)=>{
                const newContent = product.content.filter(item => item.key !== "intro");
                setProduct({...product, content:[...newContent, {key: "intro", title: "商品介紹", text: e.target.value}]})}}
            ></textarea>
            <label htmlFor="intro">商品介紹</label>
          </div>
          <div className="form-floating mt-3">
            <textarea className="form-control" style={{height:"200px"}} placeholder="商品規格" id="spec" value={
              product.content.find(item => item.key === "spec")?.text || ""
            }
              onChange={(e)=>{
                const newContent = product.content.filter(item => item.key !== "spec");
                setProduct({...product, content:[...newContent, {key: "spec", title: "商品規格", text: e.target.value}]})}}
            ></textarea>
            <label htmlFor="spec">商品規格(規格、成分、適合人數)</label>
          </div>
        </div>
        <div className="row row-cols-sm-2 mt-3 g-3">
          <div className="form-floating mt-3">
          <textarea className="form-control" style={{height:"200px"}} placeholder="配送方式與訂購須知" id="shipping" value={
            product.content.find(item => item.key === "shipping")?.text || ""
          }
            onChange={(e)=>{
                const newContent = product.content.filter(item => item.key !== "shipping");
                setProduct({...product, content:[...newContent, {key: "shipping", title: "配送方式與訂購須知", text: e.target.value}]})}}
          ></textarea>
          <label htmlFor="shipping">配送方式與訂購須知</label>
        </div>
        <div className="form-floating mt-3">
          <textarea className="form-control" style={{height:"200px"}} placeholder="保存方式與賞味期限" id="storage" value={
            product.content.find(item => item.key === "storage")?.text || ""
          }
            onChange={(e)=>{
                const newContent = product.content.filter(item => item.key !== "storage");
                setProduct({...product, content:[...newContent, {key: "storage", title: "保存方式與賞味期限", text: e.target.value}]})}}
          ></textarea>
          <label htmlFor="storage">保存方式與賞味期限</label>
        </div>
        </div>
        {/* 商品內容結束 */}
        {/* 尺寸與價格 */}
        {product.options.map((option, index)=>{
          return (
            <div key={"option" + index} className="row row-cols-1 row-cols-sm-3 mt-3 g-3">
              <div className="d-flex col">
              <label htmlFor={"size" + index} className="me-2 col-form-label text-nowrap flex-shrink-0">尺寸</label>
              <div className="flex-grow-1">
                <select
                className="form-select"
                name="size"
                id={"size" + index}
                value={option.size || "disabled"}
                onChange={(e) => {
                  const newOptions = [...product.options];
                  newOptions[index].size = e.target.value;
                  setProduct({...product, options: newOptions});
                }
                }>
                  <option value="disabled" disabled>請選擇</option>
                  <option value="切片" disabled={selectedSizes.includes("切片") && option.size !== "切片"}>切片</option>
                  <option value="4吋" disabled={selectedSizes.includes("4吋") && option.size !== "4吋"}>4吋</option>
                  <option value="6吋" disabled={selectedSizes.includes("6吋") && option.size !== "6吋"}>6吋</option>
                  <option value="8吋" disabled={selectedSizes.includes("8吋") && option.size !== "8吋"}>8吋</option>
                  <option value="個" disabled={selectedSizes.includes("個") && option.size !== "個"}>個</option>
                  <option value="杯" disabled={selectedSizes.includes("杯") && option.size !== "杯"}>杯</option>
                  <option value="條" disabled={selectedSizes.includes("條") && option.size !== "條"}>條</option>
                </select>
              </div>
            </div>
            <div className="d-flex col">
              <label htmlFor={"originPrice" + index} className="me-2 col-form-label text-nowrap flex-shrink-0">原價</label>
              <div className="flex-grow-1">
                <input id={"originPrice" + index} type="number" className="form-control" placeholder="原價"
                onChange={(e)=>{
                  const newOptions = [...product.options];
                  newOptions[index].originPrice = e.target.value * 1;
                  setProduct({...product, options: newOptions});
                }}/>
              </div>
            </div>
            <div className="d-flex col">
              <label htmlFor={"price" + index} className="me-2 col-form-label text-nowrap flex-shrink-0">售價</label>
              <div className="flex-grow-1">
                <input id={"price" + index} type="number" className="form-control" placeholder="售價"
                onChange={(e)=>{
                  const newOptions = [...product.options];
                  newOptions[index].price = e.target.value * 1;
                  setProduct({...product, options: newOptions});
                }}/>
              </div>
            </div>
            </div>
          )
        })}
        <div className="row row-cols-2">
          <div className="col">
            <button type="button" className="btn btn-danger mt-3 w-100 btn-sm"
              onClick={(e)=>{
                const newOptions = [...product.options];
                if(newOptions.length <= 1) return
                newOptions.pop();
                setProduct({...product, options: [...newOptions]});
              }}
            >取消一筆</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary mt-3 w-100 btn-sm" 
              onClick={(e)=>{
                setProduct({...product, options: [...product.options, { size: "", originPrice: "", price: "" }]})
              }}>
                新增尺寸選項</button>
          </div>
        </div>
        {/* 尺寸與價格結束 */}
        {/* 啟用商品 */}
        <div className="form-check form-switch mt-3">
          <input className="form-check-input" type="checkbox" id="isEnabled" defaultChecked
            onChange={(e)=>{setProduct({...product, is_enabled: e.target.checked})}}
          />
          <label className="form-check-label" htmlFor="isEnabled">啟用</label>
        </div>
        {/* 啟用商品結束 */}
        {/* 新品開關 */}
        <div className="form-check form-switch mt-3">
          <input className="form-check-input" type="checkbox" id="isNew" defaultChecked
            onChange={(e)=>{setProduct({...product, isNew: e.target.checked})}}
          />
          <label className="form-check-label" htmlFor="isNew">新品</label>
        </div>
        {/* 新品開關結束 */}
        {/* 熱門商品開關 */}
        <div className="form-check form-switch mt-3">
          <input className="form-check-input" type="checkbox" id="isPopular" defaultChecked
            onChange={(e)=>{setProduct({...product, isPopular: e.target.checked})}}
          />
          <label className="form-check-label" htmlFor="isPopular">熱門商品</label>
        </div>
        {/* 熱門商品開關結束 */}
        {/* 主要圖片 */}
        <div className="row">
          <div className="form-floating mt-3 col-sm-8">
            <input id="mainPicture" type="url" className="form-control" placeholder="主要圖片網址"
              onChange={(e)=>{setProduct({...product, imageUrl: e.target.value})}}
            />
            <label htmlFor="mainPicture">主要圖片網址</label>
          </div>
          <div className="col-sm-4">
            {product.imageUrl && <img src={product.imageUrl} style={{objectFit:'cover', height:'150px'}} alt="主要圖片" />}
          </div>
        </div>
        {/* 主要圖片結束 */}
        {/* 次要圖片 */}
        {
          product.imagesUrl.map((imgUrl, index)=>{
            return (
              <div className="form-floating mt-3" key={index}>
                <input id={"imagesUrl" + index} type="url" className="form-control" placeholder="次要圖片網址"
                  onChange={(e)=>{
                    const newImagesUrl = [...product.imagesUrl];
                    newImagesUrl[index] = e.target.value;
                    setProduct({...product, imagesUrl: newImagesUrl});
                  }}
                />
                <label htmlFor={"imagesUrl" + index}>次要圖片網址</label>
              </div>
            )
          })
        }
        <div className="row row-cols-2">
          <div className="col">
            <button type="button" className="btn btn-danger mt-3 w-100 btn-sm"
              onClick={(e)=>{
                const newImagesUrl = [...product.imagesUrl];
                if(newImagesUrl.length <= 1) return
                newImagesUrl.pop();
                setProduct({...product, imagesUrl: [...newImagesUrl]});
              }}
            >取消一筆</button>
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary mt-3 w-100 btn-sm" 
              onClick={(e)=>{
                setProduct({...product, imagesUrl: [...product.imagesUrl, '']})
              }}>
                新增圖片</button>
          </div>
        </div>
        {/* 次要圖片結束 */}
        <br />
        <button type="button" className="btn btn-primary mt-3" 
          onClick={()=>{
            (async ()=>{
              try {
                const res = await axios.post(`${API_BASE_URL}/v2/api/${api_path}/admin/product`, {data: product});
              } catch(error) {
                console.warn("上傳失敗：", error.response)
              }
            })()
          }}
        >上傳</button>
      </form>
    </div>
  </>;
}
