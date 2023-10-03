import moment from "moment";

export const fromNowFilter = {
  methods: {
    fromNow(datetime) {
      if (!datetime) {
        return "-";
      }
      // 使用 moment 提供的 fromNow 方法
      return moment(datetime).fromNow();
    },
  },
};

export const emptyImageFilter = {
  methods: {
    emptyImage(src) {
      return src || "https://fakeimg.pl/350x220/DFDFDF/?text=No+Image";
    },
  },
};
