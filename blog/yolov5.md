## 关于文件train.py
1. 训练时模型的输出格式: pred = model(imgs), pred是一个python list, len()为3, list中每一个元素都是tensor, size=[bs, anchor_num, grid_w, grid_h, xywh+c+classes]. 如在coco数据集上, pred[0].size()--->torch.Size([64, 3, 80, 80, 85]).


## 关于文件val.py
1. 测试时模型的输出格式: preds, train_out = model(im) if compute_loss else (model(im, augment=augment), None), preds.size()--->[bs, anchor_num, grid_w, grid_h, xywh+c+classes], train_out的格式与train.py中的pred相同。
























