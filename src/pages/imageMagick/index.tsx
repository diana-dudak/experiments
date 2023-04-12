import React, { useEffect, useRef, useState } from "react";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import Page from "../../shared/Page";
import { DataItem } from "./model";
import { downloadImage, getData, updateData } from "./ImageMagickAPI";
import { v4 as uuid } from "uuid";
import html2canvas from "html2canvas";

import "./index.scss";
import Dialog from "../../shared/Dialog";

const WIDTH = 1080;
const HEIGHT = 1920;

const ImageMagick = () => {
  /* Local data */
  const [data, setData] = useState<DataItem[]>([]);
  /* Saved response, to cancel edit without saving */
  const [responseData, setResponseData] = useState<DataItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [isPreviewOpen, setPreviewOpen] = useState<boolean>(false);

  const dataRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getData()
      .then((res) => {
        setData(res);
        setResponseData(res);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    if (isEditMode) {
      setData(responseData);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleAdd = () => {
    setData((prev) => [...prev, { id: uuid(), label: "", value: "" }]);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, value: string, isLabel?: boolean) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [isLabel ? "label" : "value"]: value };
        } else {
          return item;
        }
      })
    );
  };

  const handleSave = () => {
    updateData(data).then(() => setResponseData(data));
    setEditMode(false);
  };

  const handleDownload = () => {
    downloadImage().then((res) => {});
  };

  const handleHTML2Canvas = () => {
    console.log("html2canvas");
    const options = {
      width: WIDTH,
      height: HEIGHT,
      windowWidth: WIDTH,
      windowHeight: HEIGHT,
    };
    html2canvas(dataRef.current as any, options).then(function (canvas) {
      (previewRef.current as any).appendChild(canvas);
      canvas.classList.add("ImageMagick__canvas");
      console.dir(canvas);
    });
  };

  useEffect(() => {
    if (isPreviewOpen) {
      handleHTML2Canvas();
    }
  }, [isPreviewOpen]);

  if (isLoading) {
    return <Page type="loading">Loading...</Page>;
  }

  if (error) {
    return <Page type="error">{error.message}</Page>;
  }

  return (
    <Page>
      <h1>Image Magick</h1>
      <div className="ImageMagick">
        <div style={{ marginTop: 20 }} className="ImageMagick__row">
          <Button onClick={handleEdit}>
            {isEditMode ? "Close edit" : "Edit"}
          </Button>
          {!isEditMode && <Button onClick={handleDownload}>Download</Button>}

          {isEditMode && <Button onClick={handleSave}>Save</Button>}
        </div>
        <div ref={dataRef} className="ImageMagick__list">
          {!isEditMode && data.length === 0 && <Page type="error">No data.</Page>}
          {data.map((item) => {
            if (isEditMode) {
              return (
                <div key={item.id} className="ImageMagick__row">
                  <Input
                    value={item.label}
                    onChange={(e: any) =>
                      handleChange(item.id, e.target.value, true)
                    }
                  />
                  <Input
                    value={item.value}
                    onChange={(e: any) => handleChange(item.id, e.target.value)}
                  />
                  <Button onClick={() => handleDelete(item.id)}>x</Button>
                </div>
              );
            }
            return (
              <div key={item.id} className="ImageMagick__row ImageMagick__item">
                <span className="ImageMagick__label">{item.label}</span>{" "}
                <span className="ImageMagick__value">{item.value}</span>
              </div>
            );
          })}
          {isEditMode && (
            <div className="ImageMagick__row">
              <Button onClick={handleAdd}>Add row</Button>
            </div>
          )}
        </div>
        {!isEditMode && (
          <div className="ImageMagick__list">
            <Button onClick={() => setPreviewOpen(true)}>Preview</Button>
          </div>
        )}
        <Dialog open={isPreviewOpen} onClose={() => setPreviewOpen(false)}>
          <h2>Preview</h2>
          <div className="ImageMagick__preview" ref={previewRef}></div>
        </Dialog>
      </div>
    </Page>
  );
};

export default ImageMagick;
