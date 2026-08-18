# AWS SAA 备考资料包

主人，这套文档按 **AWS Certified Solutions Architect - Associate / SAA-C03** 整理，目标是覆盖考试大部分高频考点，并把知识转成以后从 IT 派遣跳自社开发也能用的架构表达能力。

## 文件说明

- `01-备考路线图.md`：4 周冲刺计划，按“学服务 → 做题 → 复盘 → 模考”推进。
- `02-高频服务速查.md`：SAA 高频服务对比，适合日常快速翻。
- `03-架构场景题模板.md`：常见题型解法套路，训练看到关键词就能选架构。
- `04-错题本模板.md`：复盘模板，避免“题做了但没吸收”。
- `05-模拟题.md`：30 道中文练习题，带答案和解析。
- `06-完整考点笔记.md`：按 SAA-C03 四大领域系统扩写，覆盖 IAM/KMS/网络/计算/存储/数据库/解耦/监控/迁移/DR/成本/Well-Architected。
- `07-服务选择决策树.md`：按题干目标词选择服务，适合刷题时快速建立判断路径。
- `08-易混淆服务对比.md`：集中区分 Multi-AZ vs Read Replica、SQS vs SNS vs EventBridge、CloudWatch vs CloudTrail vs Config 等高频陷阱。
- `09-考前90分钟速记.md`：考前最后一轮快速复习，只保留高价值判断规则。
- `10-日语面试表达-AWS架构.md`：把 AWS 架构知识转成日本求职/面试可用表达。
- `11-查漏补缺与边界条件.md`：官方考纲对照、易说过头的口诀边界和最后检查表。
- `12-日本IT跳槽定位与路线.md`：结合在日派遣、中国开发经历、N2 与年龄阶段确定跳槽叙事。
- `13-职务经历书与项目盘点.md`：把项目经验转成日本企业能判断的职责、行动和成果。
- `14-日本IT面试实战.md`：转职理由、自我介绍、年龄与日语等问题的回答模板。
- `15-企业筛选与90天计划.md`：识别伪自社/伪社内开发，并按周推进求职。

## 手机阅读站

仓库使用 Material for MkDocs 构建 iPhone 优先的复习站，支持全文搜索、深色模式、模拟题答案折叠、阅读位置记忆和离线缓存。合并到 `main` 后由 GitHub Actions 自动发布到：

<https://vernezhong.github.io/saa-docs/>

本地预览：

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python scripts/prepare_docs.py
mkdocs serve
```

iPhone 使用 Safari 打开网站后，选择“分享 → 添加到主屏幕”。

## 推荐使用方式

### 每天 90-150 分钟版本

1. **30-45 分钟：学/复习一个主题**：优先看 `06-完整考点笔记.md`。
2. **45-75 分钟：刷题**：做题时对照 `07-服务选择决策树.md`。
3. **15-30 分钟：错题复盘**：写进 `04-错题本模板.md`，再查 `08-易混淆服务对比.md`。
4. **5 分钟：写一句今天学到的架构判断规则**。

### 每周目标

- 第 1 周：核心基础，尤其 IAM / VPC / EC2 / ELB / ASG / S3 / KMS。
- 第 2 周：数据库、解耦、Serverless、监控、安全检测。
- 第 3 周：大量场景题 + 错题本，形成关键词反射。
- 第 4 周：模考、查漏补缺、考前速查，最后看 `09-考前90分钟速记.md`。

## SAA-C03 四大领域

- **Design Secure Architectures**：IAM、KMS、Secrets Manager、Organizations、VPC Endpoint、WAF/Shield、CloudTrail/Config/GuardDuty。
- **Design Resilient Architectures**：多 AZ、ASG、ELB、RDS Multi-AZ、SQS 解耦、备份、跨区域 DR。
- **Design High-Performing Architectures**：CloudFront、Global Accelerator、缓存、Read Replica、DynamoDB、EBS/FSx 性能选择。
- **Design Cost-Optimized Architectures**：S3 生命周期、Spot、Savings Plans/RI、Serverless、Athena、存储类选择。

## SAA 做题核心口诀

- **高可用**：多 AZ、Auto Scaling、ALB/NLB、RDS Multi-AZ、托管故障切换。
- **低成本**：S3 生命周期、Spot、Reserved/Savings Plans、Serverless、按访问模式选存储类。
- **解耦**：SQS 缓冲、SNS 扇出、EventBridge 事件路由、Step Functions 编排。
- **静态内容全球加速**：S3 + CloudFront + OAC。
- **TCP/UDP 全球入口**：Global Accelerator。
- **数据库读扩展**：Read Replica；故障切换：Multi-AZ。
- **安全访问 AWS 服务**：IAM Role，不要硬编码 AK/SK。
- **私网访问 AWS 服务**：VPC Endpoint。
- **审计/监控/合规**：CloudTrail 看 API，CloudWatch 看指标日志，Config 看配置。

## 复习原则

不要只背服务名。SAA 更喜欢问：

- 哪个方案 **最可靠**？
- 哪个方案 **成本最低**？
- 哪个方案 **运维最少**？
- 哪个方案 **满足 RTO/RPO**？
- 哪个方案 **最安全**？

如果时间紧：先看 `09-考前90分钟速记.md`，再按错题回到 `06/07/08` 查漏补缺。
