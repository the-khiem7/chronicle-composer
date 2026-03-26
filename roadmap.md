# Chronicle Composer Roadmap

Mục tiêu: đưa Chronicle Composer từ ý tưởng/workflow thành skill repository production-grade, có thể đóng gói và phân phối ổn định cho marketplace Skills.sh.

## Phạm vi sản phẩm

- Repo này chỉ duy trì 1 skill duy nhất: `chronicle-composer`.
- Mọi tooling/build/CI đều tối ưu cho single-skill, không mở rộng multi-skill trong giai đoạn hiện tại.

## Nguyên tắc template tham chiếu

- Thư mục `agent-skills/` chỉ là template tham chiếu từ `vercel-labs/agent-skills`.
- Không xem `agent-skills/` là source of truth của sản phẩm `chronicle-composer`.
- Source of truth chỉ nằm ở `skills/chronicle-composer/` và `packages/chronicle-composer-build/`.
- Artifact/release publish lên Skills.sh chỉ được đóng gói từ skill thật, không bao gồm nội dung template tham chiếu.

## Quy ước cập nhật tiến độ

- Sau mỗi tác vụ hoàn thành: tick `[x]` ngay trong checklist.
- Nếu task phát sinh mới: thêm task mới ở milestone phù hợp dưới dạng `[ ]`.
- Không xóa task cũ; giữ lại để làm lịch sử triển khai.
- Mỗi lần cập nhật nên ghi 1 dòng vào nhật ký tiến độ ở cuối file.

## 1) Outcome Mong Muốn

- Chuẩn hóa cấu trúc repo theo mô hình skill-as-product.
- Có pipeline validate/build/package tự động.
- Có CI quality gate cho mọi pull request.
- Có versioning + release artifact rõ ràng.
- Có quy trình mở rộng rule/skill an toàn khi scale.
- Có cấu hình release phù hợp để publish lên Skills.sh.

---

## 2) Milestones Tổng Quan

## M1 - Foundation Repo (Week 1)

### Mục tiêu
Đặt nền tảng cấu trúc và chuẩn đóng gói.

### Việc cần làm
- [ ] Tạo cấu trúc thư mục `skills/chronicle-composer/`, `skills/chronicle-composer/rules/`, `packages/chronicle-composer-build/src/`, `.github/workflows/`.
- [x] Cấu hình `.gitignore` để bỏ qua thư mục template `agent-skills/`.
- [ ] Tạo file `skills/chronicle-composer/SKILL.md`.
- [ ] Tạo file `skills/chronicle-composer/metadata.json`.
- [ ] Tạo file `skills/chronicle-composer/rules/_template.md`.
- [ ] Tạo file `skills/chronicle-composer/rules/_sections.md`.
- [ ] Tạo `AGENTS.md` cho contributor guidelines của repo.
- [ ] Tạo package build với scripts `validate`, `build`, `extract-tests`.
- [ ] Thêm quy ước trong tài liệu contributor: `agent-skills/` là template reference, không chỉnh sửa để release sản phẩm.

### Definition of Done
- [ ] Có thể chạy local `validate` và `build` không lỗi.
- [ ] `SKILL.md` và `metadata.json` có schema thống nhất.
- [ ] Không có artifact/release nào lấy source từ `agent-skills/`.

---

## M2 - Rule Engine + Build System (Week 2)

### Mục tiêu
Biến rule markdown thành artifact compile-ready.

### Việc cần làm
- [ ] Xây parser cho rule markdown + frontmatter.
- [ ] Xây validator cho `title`, `impact`, `explanation`.
- [ ] Xây validator kiểm tra đủ bad/good examples.
- [ ] Xây validator kiểm tra filename prefix map với section.
- [ ] Xây build script để compile `AGENTS.md` từ rules.
- [ ] Xây extract-tests script để xuất `test-cases.json`.

### Definition of Done
- [ ] Build output `AGENTS.md` deterministic.
- [ ] Validate chặn được rule sai format.
- [ ] `test-cases.json` tạo ra ổn định từ rules.

---

## M3 - CI/CD Quality Gates (Week 3)

### Mục tiêu
Mọi thay đổi quan trọng đều được kiểm soát tự động.

### Việc cần làm
- [ ] Tạo workflow CI cho pull request: install dependencies, run validate, run build.
- [ ] Áp dụng path filter để chỉ chạy job khi skill/build package thay đổi.
- [ ] Thêm status badge vào README.

### Definition of Done
- [ ] PR không pass validate/build thì không merge.
- [ ] CI chạy ổn định và thời gian hợp lý.

---

## M4 - Versioning + Release Packaging (Week 4)

### Mục tiêu
Đóng gói bản phát hành nhất quán, truy vết được.

### Việc cần làm
- [ ] Chuẩn hóa semantic version cho skill.
- [ ] Đồng bộ version giữa `metadata.json` và `SKILL.md` frontmatter.
- [ ] Tạo release workflow build artifact.
- [ ] Tạo bước zip skill directory trong release workflow.
- [ ] Tạo bước release notes ngắn trong release workflow.
- [ ] Tạo bước publish GitHub release.
- [ ] Tạo changelog theo phiên bản.
- [ ] Thiết lập cấu hình publish cho Skills.sh (single-skill package name, source path, artifact naming).
- [ ] Xác thực luồng cài đặt từ Skills.sh bằng repo slug thực tế.
- [ ] Bổ sung tài liệu install/publish cho Skills.sh trong README.

### Definition of Done
- [ ] Có artifact zip theo version.
- [ ] Có release tag và ghi chú phát hành.
- [ ] Cài đặt được từ Skills.sh theo hướng dẫn chính thức.

---

## M5 - Production Hardening (Week 5+)

### Mục tiêu
Tăng độ tin cậy, dễ mở rộng, dễ cộng tác.

### Việc cần làm
- [ ] Bổ sung regression checks cho test-cases.
- [ ] Bổ sung lint/format policy cho markdown và scripts.
- [ ] Thiết lập `CODEOWNERS` cho khu vực trọng yếu.
- [ ] Viết contributing guide cho việc thêm/chỉnh rule.
- [ ] Tạo checklist review cho skill content quality.

### Definition of Done
- [ ] Contributor mới có thể thêm rule đúng chuẩn trong 1 lần PR.
- [ ] Không có thay đổi phá vỡ pipeline khi mở rộng số lượng rules.

---

## 3) Backlog Ưu Tiên Cao

- [ ] Scaffold skill structure chính thức (không để template lẫn với core repo).
- [ ] Hoàn thiện parser + validator + build scripts.
- [ ] Thiết lập CI validate/build cho PR.
- [ ] Thiết lập release packaging và version bump.
- [ ] Viết tài liệu contributor và governance.

---

## 4) Risk & Mitigation

- Risk: schema rule thay đổi liên tục gây vỡ build.
  - Mitigation: khóa schema version, thêm migration script.
- Risk: CI chậm khi repo lớn dần.
  - Mitigation: path filters + cache dependencies.
- Risk: contributor viết rule không đồng nhất.
  - Mitigation: _template.md bắt buộc + validate cứng.
- Risk: artifact build không deterministic.
  - Mitigation: sort rules nhất quán, chuẩn hóa line ending.

---

## 5) KPI Theo Dõi

- Tỷ lệ PR pass CI ngay lần đầu.
- Thời gian trung bình để release phiên bản mới.
- Số lỗi format/schema bị chặn trước khi merge.
- Số lượng rules mới thêm mà không phá pipeline.

---

## 6) Next Action (Immediate)

- [ ] Khởi tạo skeleton cho `skills/chronicle-composer` và `packages/chronicle-composer-build`.
- [ ] Thiết lập scripts `validate`/`build`/`extract-tests`.
- [ ] Tạo workflow CI đầu tiên cho pull request.
- [ ] Chốt spec publish của Skills.sh để khóa cấu hình đóng gói single-skill.

---

## 7) Nhật ký tiến độ

- [x] 2026-03-26: Khởi tạo file roadmap ban đầu.
- [x] 2026-03-26: Chuyển roadmap sang checklist có tick để tracking tiến trình.
- [x] 2026-03-26: Cập nhật roadmap theo phạm vi single-skill và bổ sung checklist cấu hình publish Skills.sh.
- [x] 2026-03-26: Bổ sung nguyên tắc `agent-skills/` là template tham chiếu, tách khỏi source/release chính thức.
- [x] 2026-03-26: Thiết lập `.gitignore` để ignore thư mục template `agent-skills/`.
