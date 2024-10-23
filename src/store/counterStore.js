import { makeAutoObservable, flow } from "mobx";

class CounterStore {
    count = 0;
    abortController = null;

    constructor() {
        makeAutoObservable(this);
    }
    // Sử dụng flow để bắt sự kiện count tương tự như takeLatest
    increment = flow(function* () {
        // Nếu có tác vụ đang chạy, hủy bỏ nó
        if (this.abortController) {
            this.abortController.abort();
        }

        // Tạo một abort controller mới cho tác vụ hiện tại
        this.abortController = new AbortController();
        const { signal } = this.abortController;

        try {
            // Giả lập quá trình bất đồng bộ (ví dụ như fetch hoặc tính toán lâu)
            yield new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (signal.aborted) {
                        reject(new Error("Tác vụ bị hủy"));
                    } else {
                        this.count += 1; // Tăng count khi tác vụ hoàn thành
                        resolve();
                    }
                }, 1000); // Delay 1 giây để mô phỏng tác vụ lâu
            });
        } catch (error) {
            console.error(error.message); // Xử lý lỗi khi tác vụ bị hủy
        }
    });
}

const counterStore = new CounterStore();
export default counterStore;
