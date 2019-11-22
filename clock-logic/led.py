# TODO implement led logic
import time


class Led:
    def __init__(self, clock):
        self.clock = clock
        self.start = time.time()

    def inf_loop(self):
        time.clock()
        while True:
            # print(time.time() - self.start, self.clock)
            time.sleep(2)
