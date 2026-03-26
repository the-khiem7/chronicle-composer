# Chronicle Composer Roadmap

**Repository:** https://github.com/the-khiem7/chronicle-composer

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

- [x] Tạo cấu trúc thư mục `skills/chronicle-composer/`, `skills/chronicle-composer/rules/`, `packages/chronicle-composer-build/src/`, `.github/workflows/`.
- [x] Cấu hình `.gitignore` để bỏ qua thư mục template `agent-skills/`.
- [x] Tạo file `skills/chronicle-composer/SKILL.md`.
- [x] Tạo file `skills/chronicle-composer/metadata.json`.
- [x] Tạo file `skills/chronicle-composer/rules/_template.md`.
- [x] Tạo file `skills/chronicle-composer/rules/_sections.md`.
- [x] Tạo `AGENTS.md` cho contributor guidelines của repo.
- [x] Tạo package build với scripts `validate`, `build`, `extract-tests`.
- [x] Thêm quy ước trong tài liệu contributor: `agent-skills/` là template reference, không chỉnh sửa để release sản phẩm.

### Definition of Done

- [x] Có thể chạy local `validate` và `build` không lỗi.
- [x] `SKILL.md` và `metadata.json` có schema thống nhất.
- [x] Không có artifact/release nào lấy source từ `agent-skills/`.

---

## M2 - Rule Engine + Build System (Week 2)

### Mục tiêu

Biến rule markdown thành artifact compile-ready.

### Việc cần làm

- [x] Xây parser cho rule markdown + frontmatter.
- [x] Xây validator cho `title`, `impact`, `explanation`.
- [x] Xây validator kiểm tra đủ bad/good examples.
- [x] Xây validator kiểm tra filename prefix map với section.
- [x] Xây build script để compile `AGENTS.md` từ rules.
- [x] Xây extract-tests script để xuất `test-cases.json`.

### Definition of Done

- [x] Build output `AGENTS.md` deterministic.
- [x] Validate chặn được rule sai format.
- [x] `test-cases.json` tạo ra ổn định từ rules.

---

## M3 - CI/CD Quality Gates (Week 3)

### Mục tiêu

Mọi thay đổi quan trọng đều được kiểm soát tự động.

### Việc cần làm

- [x] Tạo workflow CI cho pull request: install dependencies, run validate, run build.
- [x] Áp dụng path filter để chỉ chạy job khi skill/build package thay đổi.
- [x] Thêm status badge vào README.

### Definition of Done

- [x] PR không pass validate/build thì không merge.
- [x] CI chạy ổn định và thời gian hợp lý.

---

## M4 - Versioning + Release Packaging (Week 4)

### Mục tiêu

Đóng gói bản phát hành nhất quán, truy vết được.

### Việc cần làm

- [x] Chuẩn hóa semantic version cho skill.
- [x] Đồng bộ version giữa `metadata.json` và `SKILL.md` frontmatter.
- [x] Tạo release workflow build artifact.
- [x] Tạo bước zip skill directory trong release workflow.
- [x] Tạo bước release notes ngắn trong release workflow.
- [x] Tạo bước publish GitHub release.
- [x] Tạo changelog theo phiên bản.
- [x] Thiết lập cấu hình publish cho Skills.sh (single-skill package name, source path, artifact naming).
- [x] Xác thực luồng cài đặt từ Skills.sh bằng repo slug thực tế.
- [x] Bổ sung tài liệu install/publish cho Skills.sh trong README.

### Definition of Done

- [x] Có artifact zip theo version.
- [x] Có release tag và ghi chú phát hành.
- [x] Cài đặt được từ Skills.sh theo hướng dẫn chính thức.

---

## M5 - Production Hardening (Week 5+)

### Mục tiêu

Tăng độ tin cậy, dễ mở rộng, dễ cộng tác.

### Việc cần làm

- [x] Bổ sung regression checks cho test-cases.
- [x] Bổ sung lint/format policy cho markdown và scripts.
- [x] Thiết lập `CODEOWNERS` cho khu vực trọng yếu.
- [x] Viết contributing guide cho việc thêm/chỉnh rule.
- [x] Tạo checklist review cho skill content quality.

### Definition of Done

- [x] Contributor mới có thể thêm rule đúng chuẩn trong 1 lần PR.
- [x] Không có thay đổi phá vỡ pipeline khi mở rộng số lượng rules.

---

## 4) Risk & Mitigation

- Risk: schema rule thay đổi liên tục gây vỡ build.
  - Mitigation: khóa schema version, thêm migration script.
- Risk: CI chậm khi repo lớn dần.
  - Mitigation: path filters + cache dependencies.
- Risk: contributor viết rule không đồng nhất.
  - Mitigation: \_template.md bắt buộc + validate cứng.
- Risk: artifact build không deterministic.
  - Mitigation: sort rules nhất quán, chuẩn hóa line ending.

---

## 5) KPI Theo Dõi

- Tỷ lệ PR pass CI ngay lần đầu.
- Thời gian trung bình để release phiên bản mới.
- Số lỗi format/schema bị chặn trước khi merge.
- Số lượng rules mới thêm mà không phá pipeline.

---

## 7) Nhật ký tiến độ

- [x] 2026-03-26: Khởi tạo file roadmap ban đầu.
- [x] 2026-03-26: Chuyển roadmap sang checklist có tick để tracking tiến trình.
- [x] 2026-03-26: Cập nhật roadmap theo phạm vi single-skill và bổ sung checklist cấu hình publish Skills.sh.
- [x] 2026-03-26: Bổ sung nguyên tắc `agent-skills/` là template tham chiếu, tách khỏi source/release chính thức.
- [x] 2026-03-26: Thiết lập `.gitignore` để ignore thư mục template `agent-skills/`.
- [x] 2026-03-26: Hoàn thành M1 Foundation Repo - tạo cấu trúc skill, build scripts, và validate được local build.
- [x] 2026-03-26: Adapt content từ ORIGINAL.md vào rule system, giữ name là chronicle-composer theo yêu cầu user.
- [x] 2026-03-26: Hoàn thành M1 Definition of Done - validate/build hoạt động, schema thống nhất, không dùng agent-skills trong artifacts.
- [x] 2026-03-26: Hoàn thành M2 Rule Engine + Build System - parser, validator, compiler hoạt động, AGENTS.md generated from rules.
- [x] 2026-03-26: Hoàn thành M3 CI/CD Quality Gates - GitHub Actions workflow với path filters, comprehensive validation, artifact uploads, status badge.
- [x] 2026-03-26: Cập nhật repo URL thật (the-khiem7/chronicle-composer) vào README badge và roadmap.
- [x] 2026-03-26: Hoàn thành M4 Versioning + Release Packaging - version manager, release workflow, changelog generation, Skills.sh documentation.
- [x] 2026-03-26: Complete M4 testing - tag v0.1.1 pushed, Skills.sh installation verified, CHANGELOG.md created, release badge added.
- [x] 2026-03-26: Hoàn thành M5 Production Hardening - regression tests, lint/format policy, CODEOWNERS, contributing guide, PR template, CI linting.
- [x] 2026-03-26: 🎉 PROJECT COMPLETE - All 5 milestones achieved. Chronicle Composer is now production-ready for Skills.sh marketplace launch. Ready for M6 future expansions.
