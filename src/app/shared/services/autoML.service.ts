import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/components/dialogs/error-dialog/error-dialog.component';
import { TestingResultDto } from '../dtos/testing-result.dto';
import { TestingDto } from '../dtos/testing.dto';
import { TrainingResultDto } from '../dtos/training-result.dto';
import { TrainingDto } from '../dtos/training.dto';
import { TestingResultModel } from '../models/testing-result.model';
import { TestingModel } from '../models/testing.model';
import { TrainingResultModel } from '../models/training-result.model';
import { TrainingModel } from '../models/training.model';

@Injectable()
export class AutoMLService {
  private baseUrl = 'https://odin-ai-backend-on.azurewebsites.net/backend/';
  public learningReport = new BehaviorSubject<TrainingResultModel | null>(null);
  public testingReport = new BehaviorSubject<TestingResultModel | null>(null);
  public predictedColumn = new BehaviorSubject<string>('');
  public trainingDatasetName = new BehaviorSubject<string>('');

  public constructor(private http: HttpClient, private dialog: MatDialog) {}

  public startLearning(
    trainingModel: TrainingModel
  ): Observable<TrainingResultModel | null> {
    trainingModel.targetColumn = trainingModel.targetColumn.replace('\r', '');
    return of(
      new TrainingResultModel(
        0.8565219933282807,
        '1338 rows x 7 columns',
        'There are not useless columns.\nColumns do not have too many missing values to be insignificant.',
        'There are not useless columns.',
        'YWdlLHNleCxibWksY2hpbGRyZW4sc21va2VyLHJlZ2lvbixjaGFyZ2VzDQoxOSxmZW1hbGUsMjcuOSwwLHllcyxzb3V0aHdlc3QsMTY4ODQuOTI0DQoxOCxtYWxlLDMzLjc3LDEsbm8sc291dGhlYXN0LDE3MjUuNTUyMw0KMjgsbWFsZSwzMywzLG5vLHNvdXRoZWFzdCw0NDQ5LjQ2Mg0K',
        'iVBORw0KGgoAAAANSUhEUgAABUwAAAIVCAYAAAAK3rV/AAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjMuNCwgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy8QVMy6AAAACXBIWXMAAA9hAAAPYQGoP6dpAABRpElEQVR4nO3dd3hW9d0/8PcdIsgQZDmrgCO4QEEBxYEDpVoXWq2K4q57VcVZxfHUvUUfrYoVUVuse0utW+mwPq0KWgcO3CWIqIhJ7t8f3uRnBBVjIIl9va4r15X7e9bnnHyMud58zzmFYrFYDAAAAAAAKWvsAgAAAAAAmgqBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwBQAAAAAoEZgCAAAAAJQITAEAAAAASgSmAAAAAAAl5Y1dAPOmWCympqbY2GXAPCsrK+hZmhU9S3Okb2lu9CzNjZ6ludGzNDcLsmfLygopFArztK7AtJkoFAqZPv3TVFXVNHYp8J3Ky8vSsWNbPUuzoWdpjvQtzY2epbnRszQ3epbmZkH3bKdObdOixbwFpm7JBwAAAAAoEZgCAAAAAJQITAEAAAAASgSmAAAAAAAlAlMAAAAAgJLyxi6AedeihXyb5mF2r+pZmgs9S3Okb2lu9CzNjZ6ludGz1FdNTTE1NcXGLqNJKRSLRVekGSgWiykUCo1dBgAAAAA/ItXV1Zk27bMFHpqWl5elY8e2qaz8JFVVNfP9eJ06tZ3nf1Aww7SZKBQKGTHyirwy+e3GLgUAAACAH4Hluy+Vs0ful7KyglmmXyEwbUZemfx2Jr70emOXAQAAAAA/Wh5sAQAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoHpXLz11lvp2bNnxo0b19ilAAAAAAALkMAUAAAAAKBEYAoAAAAAUNKkA9OJEydmr732Sr9+/bLGGmtkl112yRNPPJEkueSSS7LpppvmoYceypZbbplevXpl6623zjPPPJPnnnsuO++8c3r37p3NNtss99xzT539Tp48OYceemjWW2+9rL766tl1113z17/+9VtrGTlyZFZbbbU8+OCDtWPPPPNMdtttt6yxxhrp169fjjzyyLz33nu1yydMmFB7a//gwYPTp0+fPPDAAw14hQAAAACAhtRkA9MZM2Zkzz33TKtWrXLOOefkwgsvzEILLZT99tsvb775ZpLkgw8+yGmnnZZ99tkn559/fqZPn57DDjsshx56aDbffPNccMEF6dSpU0aMGJG33347SfLyyy9nu+22y+TJk3PMMcfk7LPPTpLsscceeeqpp+Zay1lnnZVx48bl/PPPz6abbpok+fvf/57hw4cnSc4555wcf/zx+cc//pFdd901M2bMqLP92WefnUMPPTQnn3xy+vXrN1+uFwAAAADww5U3dgHf5JVXXkllZWX23Xff9O3bN0nSu3fvXHHFFZk5c2aS5LPPPst5552XTTbZJEny6quv5vzzz8/JJ5+cXXbZJUnStWvX7LDDDvnXv/6VpZZaKpdeemnKy8tz/fXXp3379kmSjTfeOFtuuWXOPvvs3HrrrXXquPjii3Pdddfl/PPPz2abbVY7fu6552bppZfO1VdfnZYtWyZJ1lprrWy++eYZO3Zs9ttvv9p1d9xxx2y99dbz6UoBAAAAAA2lyc4wXXHFFdO1a9cccMABOeWUU/KnP/0pLVu2zHHHHZcVV1yxdr0111yz9vuuXbsmSW3AmiQdO3ZMkkyfPj1J8pe//CUbbLBBbViaJAsttFC23HLLvPDCC/n4449rx3//+99n1KhRGTx4cIYMGVI7PnPmzDz77LPZaKONUlZWlqqqqlRVVWXJJZfMqquumscff7zOuVRUVDTEJQEAAAAA5rMmO8O0TZs2ufHGG3PFFVfk/vvvzw033JCWLVtms802y8iRI2vXa9u27Rzbtm7duvb7QqFQZ9lHH31UG6x+VZcuXZKkTmD6wgsvZIMNNsgDDzyQZ555pjaI/eijj1JTU5PRo0dn9OjRc+yre/fudT7P7XgAAAAAQNPTZAPTJFlmmWVy+umnp1gsZtKkSbnnnnty9dVXp0OHDrUzR78eiH6XDh065IMPPphj/P3330+SLLroopk6dWqS5OCDD84+++yTrbfeOieeeGJuu+22tGzZMu3atUuhUMhuu+0211vtZ9+iDwAAAAA0L032lvz77rsva6+9dt5///0UCoWsvPLKOfLII7PccstlypQp9d5vv3798uijj9beop8kVVVVueeee7LKKqukTZs2teNdu3ZNy5Ytc8opp+SVV17JqFGjknw5q3XVVVfNK6+8kl69etV+9ezZM6NGjcojjzxS/xMHAAAAABpNkw1M+/btm2KxmP333z/33HNPnnjiiZx55pn597//nc0337ze+z344IPzxRdfZNddd81dd92VBx98MHvttVfefPPN/OpXv5rrNgMGDMjQoUNz9dVXZ9KkSUmSI488Mk8//XQOPfTQjB8/PuPHj8++++6bxx57LL179653fQAAAABA42mygeliiy2Wa665Jp07d86pp56a/fffP08++WR+85vfZNttt633fldcccXccMMNWXzxxfPrX/86I0aMSKFQyO9+97usv/7637jdiBEj0rZt2xx//PGprq7OwIEDM3r06FRWVuaoo47Ksccem5qamlx11VVZe+21610fAAAAANB4CsVisdjYRTBvtt/j5Ex86fXGLgMAAACAH4GVK7rlj9eeksrKT1JVVbNAj11eXpaOHdsusGN36tQ2LVrM29zRJjvDFAAAAABgQROYAgAAAACUCEwBAAAAAEoEpgAAAAAAJQJTAAAAAIASgSkAAAAAQInAFAAAAACgRGAKAAAAAFAiMAUAAAAAKBGYAgAAAACUCEwBAAAAAEoEpgAAAAAAJQJTAAAAAIASgSkAAAAAQInAFAAAAACgRGAKAAAAAFAiMAUAAAAAKBGYAgAAAACUCEwBAAAAAEoEpgAAAAAAJQJTAAAAAIASgSkAAAAAQInAFAAAAACgpLyxC2DeLd99qcYuAQAAAIAfCVnT3BWKxWKxsYvguxWLxRQKhcYuAwAAAIAfkerq6kyb9llqahZsRFheXpaOHdumsvKTVFXVzPfjderUNi1azNvN9maYNhOFQiHTp3+W6ur530DwQ7VoUZb27VvrWZoNPUtzpG9pbvQszY2epbnRs9RXTU1xgYelTZ3AtBmprq5ZIIk7NBQ9S3OjZ2mO9C3NjZ6ludGzNDd6Fn44L30CAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKyhu7AOZdixbybZqH2b2qZ0mSmppiamqK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KzAdPHhwbrjhhjz33HO1Y4VCIUnywAMPZNy4cdl4440bpkIAAAAAgAWkvD4bHXbYYZkwYUJ22mmn9OjRI4VCIRdeeGGmT5+e1157Lcsss0wOOeSQhq4VAAAAAGC+qtcM00UWWSR/+MMfst9++yX58mVPzz//fGpqarLXXnvl5ptvTseOHRu0UAAAAACA+a1eM0yTpHXr1jnkkEPMJAUAAAAAfjTqHZgmyaeffpoPPvggNTU1c13eo0ePH7J7AAAAAIAFql6B6VtvvZURI0bkH//4x7euN3HixHoVBQAAAADQGOoVmI4cOTLPPPNMtthii3Tr1i0tWrRo6LoAAAAAABa4egWm//jHP7LvvvvmyCOPbOh6Gs3MmTMzatSo3H///Xn77bfTsmXLrL766jn66KOzyiqrJEkefvjhXHzxxXn55Zez5JJL5vDDD8/555+frbfeuvZZrh999FHOP//8jB8/PtOnT8+KK66Yww47LIMGDWrM0wMAAAAA5kG9AtO2bdtmiSWWaOhaGtUxxxyTp59+OkcccUS6deuW119/PZdcckmOOOKI3HfffZkwYUIOPPDAbLDBBjn44IPzxhtv5IQTTsisWbNq9zFr1qzsscceefvtt3PIIYdkqaWWyu233579998/o0aNysYbb9yIZwgAAAAAfJd6BaY77LBD/vjHP2aHHXZIy5YtG7qmBW7WrFmZPn16jj/++GyzzTZJknXWWSeffvppzjrrrLz33nu55JJLsvzyy+eyyy5LWVlZkqRz58456qijavdz++2354UXXsiYMWPSv3//JMnGG2+cvffeO2eddZbAFAAAAACauHoFpgceeGD+7//+L4MHD866666bLl26pFAo1FmnUCjkiCOOaJAi57eWLVtm9OjRSZIPP/wwkydPzmuvvZaHH344SfLpp5/mH//4Rw444IDasDRJNt988xx77LG1n5966ql07Ngxffv2TVVVVe344MGDM3LkyEyZMiVLL730gjkpAAAAAOB7q1dgevvtt+eJJ55IsVjMrbfeOtd1mlNgmiRPPvlkzjjjjLz00ktp165dVlpppbRu3TpJMnXq1FRXV6dTp051tikvL8+iiy5a+7mysjKVlZVZddVV53qM9957T2AKAAAAAE1YvQLTyy+/PMsss0xOOOGE9OjRIy1atGjouhaoN954I/vvv38GDx6cyy67LD/5yU9SKBQyduzYPPbYY+nUqVMWWmihfPjhh3W2q66uzrRp02o/L7LIIllmmWVywQUXzPU4PXr0mJ+nAQAAAAD8QPUKTN9///0cc8wxP5o3vz/33HP5/PPPs9dee2WZZZapHX/00UeTfDlbtm/fvhk/fnwOPfTQ2scP/OlPf6pz6/2AAQPy0EMPZdFFF62zn9GjR2fChAk5//zzF9AZAQAAAAD1Ua/AdIUVVsgHH3zQ0LU0mlVXXTXl5eU577zzsscee+SLL77ILbfckkceeSRJ8tlnn+XQQw/NbrvtloMOOig///nP88477+SSSy5JktoAdejQoRk7dmz23HPP/PKXv8xPfvKTTJgwIb/97W8zdOjQtGnTptHOEQAAAAD4bmXfvcqcDj/88Fx//fW5//7788UXXzR0TQtct27dct555+WDDz7IIYccklNOOSVlZWUZM2ZMCoVC/va3v2WttdbKJZdckjfffDOHHnpoxowZk5EjRyZJ2rZtmyRp06ZNrr/++qyzzjq56KKLst9+++W+++6r3ScAAAAA0LTVa4bpNddck1atWuXwww9PixYtssgii8zxHNNCoZDHHnusQYpcEH7605/mpz/96RzjkyZNSpI88MADWXLJJXPnnXfWLnvppZeSJN27d68d69SpU0477bScdtpp87dgAAAAAKDB1SswraqqSo8ePf6rXmL09NNP56677sqvfvWrdO/ePe+9916uuOKKrLDCCll33XUbuzwAAAAAoAHUKzAdM2ZMQ9fR5B1zzDFp1apVrrzyyrz//vtZdNFFM2jQoBx55JFp2bJlY5cHAAAAADSAegWm8+I///lPOnfuPL92v8C1atUqxxxzTI455pjGLgUAAAAAmE/qHZjeeuutefDBB/Ppp5+mpqamdry6ujqffPJJXn755Tz33HMNUiQAAAAAwIJQr8D0qquuynnnnZdCoZC2bdtmxowZ6dixY6ZPn56qqqosvPDC2WmnnRq6VgAAAACA+aqsPhvdeuutWWGFFfLkk0/mj3/8Y4rFYsaNG5dnnnkmI0aMyMyZM7POOus0dK0AAAAAAPNVvQLTt956K9ttt10WXXTRLLvssunQoUP+/ve/p2XLltlrr72y2WabZfTo0Q1dKwAAAADAfFWvwLSsrCzt2rWr/dy9e/dMmjSp9vPAgQPz2muv/fDqAAAAAAAWoHoF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GfO7jgbRsmXLrLXWWo1dBgAAAADQTM1TYDp06ND5XUeSL2emXn/99bnpppvy5ptvpmvXrtluu+2y//77167zxBNP5KKLLsq///3vdO3aNcOHD88ee+yRZM5b8ufm73//e84777y88MIL6dKlS44++ug51unZs2cOO+ywPPLII5k4cWKGDRuWY445Ju+++27OOeecPP7445k5c2Z69eqVo446KmussUadbUeOHJkXX3wx9957b2bOnJn+/fvn17/+dZZddtkGvV4AAAAAQMOq10ufZnvooYfy4IMPZsqUKWnZsmWWXHLJDB48OIMGDarX/i644IJceeWV2XXXXTNixIi8+OKLufjii/PZZ5+lVatWSZLjjz8+Bx98cJZeeunceOONOeOMM9KjR495OuakSZOyxx57ZPXVV8+5556bqVOn5tRTT820adPmWPeyyy7Lfvvtl/322y+LLbZYKisrs9NOO6WsrCwjRoxI+/btc/3112f48OG54YYbstpqq9U5j4EDB+ass87KBx98kLPPPjsjRozITTfdVK/rAgAAAAAsGPUKTGtqanLkkUfmvvvuS7FYTIcOHVJdXZ3HH388N998c4YMGZILLrjgez339OOPP84111yTnXbaKSeeeGKSZNCgQfnkk0/y9NNPZ+DAgUmSU089NZtsskmSpG/fvunfv3+eeuqpeQpMr7zyyrRv3z5XXXVVFl544STJcsstl2HDhs2x7sorr5xDDjmk9vMFF1yQDz/8MHfddVftM1I33HDDbLvttrngggty9dVX16677LLL5sILL6z9PGXKlFx++eWprKxMx44d5/maAAAAAAALVll9Nrrmmmty7733ZtiwYXniiScyYcKE/O1vf8ujjz6anXfeOffff3+uu+6677XPZ599Nl988UWGDBlSZ/yII47I73//+5SVfVlq//79a5e1a9cunTp1ykcffTRPx/jLX/6S9ddfvzYsTZK11lorSy655BzrVlRU1Pn89NNPp6KiIj/5yU9SVVWVqqqqFAqFbLTRRpkwYUJmzZpVu+6aa65ZZ9vZ+//ss8/mqU4AAAAAoHHUa4bpLbfcksGDB9fOBJ1tscUWy0knnZR33303N998c3bfffd53mdlZWWSpEuXLt+6XuvWret8LisrS7FYnKdjTJs2ba4zPBdbbLE5xr5eR2VlZV5//fWsuuqqc913ZWVlFl988SSpE8jOrjH5cmYuAAAAANB01SswffPNN7Prrrt+4/L11lsvZ5111vfaZ/v27ZMkU6dOrTP+/vvv55VXXsnMmTO/f6Ff07Fjx3z44YdzjFdWVn7nC5kWWWSRrLnmmjnuuOO+cd8AAAAAQPNWr1vy27dvn7fffvsbl7/11ltp27bt99pn7969s9BCC+XBBx+sMz527NgccMAB8zyL9Nusu+66efTRRzNjxozasUmTJuXNN9/8zm379++f1157Ld26dUuvXr1qv+65555ce+21WWihhX5wfQAAAABA46rXDNP1118/Y8eOzSabbJI+ffrUWfbMM8/kxhtvzGabbfa99tmpU6cMHz48o0ePzkILLZSBAwdm4sSJufrqq7PffvvVp8w5HHTQQXnwwQez++6755e//GU+++yzXHzxxWnVqtV3brvnnnvmjjvuyPDhw7Pnnnumc+fOGT9+fG688cYcdthh3+sFVwAAAABA01SvwPTwww/PY489ll122SX9+/fPcsstlyR55ZVX8te//jWdOnXK4Ycf/r33e/TRR6dr16658cYbM2bMmCy99NI56qijsvvuu+fSSy+tT6l1LLPMMhk7dmzOOuusHHvssVlkkUWy77775s477/zObRdbbLHcdNNNOf/88/Ob3/wmM2fOzLLLLpuTTz45u+yyyw+uDQAAAABofIViPe91nzJlSs4///z8+c9/zqeffpokadOmTTbaaKP86le/ytJLL92ghZL87M6X8vzUzxpsf6t2ap27t6pIZeUnqaryQioaTnl5WTp2bKu3aDb0LM2RvqW50bM0N3qW5kbP0tws6J7t1KltWrSYt6eT1muGaZIsvfTSOe+881JTU5PKysoUi8V06tSp9o3wAAAAAADNTb3TzX/+85859NBDM3Xq1HTu3DldunTJmWeemQMPPDCvvPJKQ9YIAAAAALBA1Csw/dvf/pZdd901Tz31VKZNm1Y73qVLlzzzzDPZYYcd8tJLLzVUjQAAAAAAC0S9AtNLLrkk3bp1ywMPPJAVVlihdvyXv/xl7r333iy55JI5//zzG6xIAAAAAIAFoV6B6QsvvJCddtopHTt2nGNZx44d84tf/CL/+Mc/fnBxAAAAAAALUr0C07KyssyYMeMbl8+cOTNVVVX1LgoAAAAAoDHUKzDt27dvbrjhhvznP/+ZY1llZWVuuumm9O3b9wcXBwAAAACwIJXXZ6ODDz44u+yyS4YMGZKf/exnWXbZZdOqVatMnjw59913Xz7++ONcdNFFDV0rAAAAAMB8Va/AdNVVV83o0aNz5pln5g9/+EOKxWLtslVWWSUXXXRRevXq1WBFAgAAAAAsCPUKTJMvb8v/wx/+kKlTp2bKlCmpqanJUkstla5duzZkfQAAAAAAC0y9A9PZOnXqlE6dOjVELQAAAAAAjapeL30CAAAAAPgxEpgCAAAAAJQITAEAAAAASgSmAAAAAAAlAlMAAAAAgBKBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwBQAAAAAoEZgCAAAAAJQITAEAAAAASsobuwDm3QodWjXp/QEAAABAcycwbSaKxWIu2qBbg++3qqaYmppig+8XAAAAAJojgWkzUSgUMn36Z6murmnQ/dYITAEAAACglsC0GamurklVVcMGpgAAAADA/+elTwAAAAAAJQJTAAAAAIASgSkAAAAAQInAFAAAAACgRGAKAAAAAFAiMAUAAAAAKBGYAgAAAACUCEwBAAAAAEoEpgAAAAAAJQJTAAAAAIASgSkAAAAAQEl5YxfAvGvRom6+XVNTTE1NsZGqAQAAAIAfH4FpM1EsFtO+fes6Y1U1xXxU+YnQFAAAAAAaiMC0mSgUCjns0dfz8kefJ0lW6NAqF23QLWVlBYEpAAAAADQQgWkz8vJHn+f5qZ81dhkAAAAA8KPlpU8AAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMv8Gxxx6bDTbYoLHLAAAAAAAWoPLGLqCp2n///bPLLrs0dhkAAAAAwAIkMP0G3bt3b+wSAAAAAIAFrFnfkr/xxhvnzDPPzN57753VV189hx9+eD766KOcfPLJWXfdddOrV69st912eeSRR+ps98UXX+Tcc8/NBhtskNVXXz2//OUvc8cdd6Rnz5556623ksx5S351dXVuuOGGbLXVVll99dUzaNCgnHXWWZk5c2btOscee2z22GOP3HHHHdl8882z2mqr5ac//WnuuOOOBXNBAAAAAIAfpNnPML3++uuz/fbbZ/fdd0+hUMgee+yRt99+O4ccckiWWmqp3H777dl///0zatSobLzxxkmSk046KXfeeWcOPPDArLLKKrnzzjtz4oknfutxTjrppNx6663Zc889079//0ycODGXXXZZJk6cmNGjR6dQKCRJnn/++UyZMiUHHHBAOnfunN/+9rcZMWJEevXqlR49esz36wEAAAAA1F+zD0w7duyYX//61ykvL8+4cePywgsvZMyYMenfv3+SL2eh7r333jnrrLOy8cYb54033sitt96ao446Kvvss0+SZMMNN8zee++dxx9/fK7HePnll3PzzTfnkEMOycEHH5wkGTRoUBZffPEce+yxeeihh7LJJpskSaZPn54bb7wxK6ywQpKkR48e2XTTTfPnP/9ZYAoAAAAATVyzviU/SZZffvmUl3+Z+z711FPp2LFj+vbtm6qqqtqvwYMHZ/LkyZkyZUomTJiQYrGYn/70p3X2s+WWW37jMf7yl78kSbbaaqs641tttVVatGhRuzxJOnToUBuWJskSSyyRJPn0009/2IkCAAAAAPNds59h2qVLl9rvKysrU1lZmVVXXXWu67733nuZOnVqkqRTp051lnXu3Pkbj/HRRx/NcawkKS8vT8eOHTN9+vTasYUXXrjOOmVlX2bSxWLxu04FAAAAAGhkzT4w/apFFlkkyyyzTC644IK5Lu/Ro0feeOONJMl//vOftGnTpnbZ7CB1bjp06JAk+fDDD9O2bdva8S+++CKVlZXp2LFjQ5QPAAAAADSyZn9L/lcNGDAg7777bhZddNH06tWr9utvf/tbRo0albKysqy55ppp0aJF7r///jrb3nfffd+439nPQ73zzjvrjN99992prq7Ommuu2fAnAwAAAAAscD+qGaZDhw7N2LFjs+eee+aXv/xlfvKTn2TChAn57W9/m6FDh6ZNmzZp06ZNtt9++1x00UWpqqrKyiuvnAcffDCPPvpokv9/C/1XrbDCChk6dGguu+yyzJw5M/3798+kSZNy2WWXpV+/ftlwww0X8JkCAAAAAPPDjyowbdOmTa6//vpccMEFueiiizJ9+vQstdRSOeSQQ7LvvvvWrvfrX/86bdq0yXXXXZcZM2Zk4MCBOeCAA3LppZfWuU3/q/7nf/4n3bp1yx//+Mdce+21WWyxxbLrrrvm4IMPTosWLRbUKQIAAAAA81Gh+F/2NqJp06blz3/+cwYNGlTnxU9nnXVWbr311jz99NONWN23+9mdL+X5qZ8lSVbt1Dp3b1WRyspPUlVV08iVQV3l5WXp2LGt/qTZ0LM0R/qW5kbP0tzoWZobPUtzs6B7tlOntmnRYt6eTvqjmmE6L1q3bp0zzzwzt9xyS3bfffe0adMm//jHPzJmzJgcdNBBjV0eAAAAANCI/usC01atWuXaa6/NhRdemBNOOCGfffZZunXrluOOOy677LJLY5cHAAAAADSi/7rANElWXnnlXHHFFY1dBgAAAADQxMzbjfsAAAAAAP8FBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAkvLGLoB5t0KHVnP9HgAAAABoGALTZqJYLOaiDbrVGauqKaampthIFQEAAADAj4/AtJkoFAqZPv2zVFfX1I7VCEwBAAAAoEEJTJuR6uqaVFXVfPeKAAAAAEC9eOkTAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjBtRgqFQmOXAAAAAAA/agLTZqJYLGaR9q1TViY0BQAAAID5RWDaTBQKhbQoKwhMAQAAAGA+EpgCAAAAAJQITAEAAAAASgSmAAAAAAAlAlMAAAAAgBKBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwBQAAAAAoEZgCAAAAAJQITAEAAAAASgSmAAAAAAAlAlMAAAAAgBKBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwBQAAAAAoEZgCAAAAAJQITAEAAAAASgSmAAAAAAAlAlMAAAAAgBKBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwBQAAAAAoEZgCAAAAAJQITAEAAAAASgSmAAAAAAAlAtOvmThxYvbaa6/069cva6yxRnbZZZc88cQTtctffvnl7L///unbt2/69OmT/fbbL6+++mrt8jPPPDM9e/ass8348ePTs2fPXHvttQvyVAAAAACA76lQLBaLjV1EUzFjxowMHjw4ffr0yS9+8YskyejRo/P3v/899957b2pqarL99ttnqaWWyn777Zck+e1vf5t33nknt912W5Zccsl8/vnnGTp0aD7//PPcdddd+fTTT7PllltmlVVWyVVXXZVCofCDaqys/CRVVTU/+FxhfiovL0vHjm31K82GnqU50rc0N3qW5kbP0tzoWZqbBd2znTq1TYsW8zZ3tHw+19KsvPLKK6msrMy+++6bvn37Jkl69+6dK664IjNnzswVV1yRFi1a5Lrrrsuiiy6aJNlggw2y6aab5vLLL8+pp56aVq1a5ayzzspOO+2Uyy67LK+99lqKxWLOPPPMHxyWAgAAAADzl8D0K1ZcccV07do1BxxwQLbYYoust956GTBgQI477rgkydNPP50BAwakXbt2qaqqSpK0bt06AwcOzOOPP167n169emW//fbL5Zdfnpqamlx22WXp2rVro5wTAAAAADDvBKZf0aZNm9x444254oorcv/99+eGG25Iy5Yts9lmm2XkyJGprKzM/fffn1VXXXWObRdaaKE6n4cOHZrLLrssHTp0SL9+/RbUKQAAAAAAP4DA9GuWWWaZnH766SkWi5k0aVLuueeeXH311enQoUMWWWSRDBgwIPvss8+37qNYLOakk07KkksumU8++SSnnnpqzj333AV0BgAAAABAfQlMv+K+++7LyJEjc8cdd2SxxRbLyiuvnJVXXjl//vOfM2XKlPTv3z8vv/xyVlpppTozSkeMGJGOHTumV69eSZKxY8fmySefzNVXX5133nknJ554YjbddNMMGTKksU4NAAAAAJgHAtOv6Nu3b4rFYvbff//ss88+6dChQx577LH8+9//zj777JNVVlklv/jFL7LXXntl2LBhad26df74xz/m/vvvz9lnn50kef3113Puuedm6NChWW+99ZIkd955Z04++eSstdZa6dy5c2OeIgAAAADwLQrFYrHY2EU0Jc8//3wuvPDC/Otf/8onn3ySHj16ZPfdd8/222+fJJk4cWIuvPDC/PWvf02xWMzyyy+fvffeO5tvvnlqamqyyy675M0338zdd9+dRRddNEnyxhtvZKuttsq6666byy677AfVV1n5Saqqan7oacJ8VV5elo4d2+pXmg09S3Okb2lu9CzNjZ6ludGzNDcLumc7dWqbFi3K5mldgWkz4xcfzYH/UdPc6FmaI31Lc6NnaW70LM2NnqW5acqB6bytBQAAAADwX0BgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAkvLGLoB5UywWU1NMamqKjV0KAAAAAPxomWHaTBQKhXw8/TOBKQAAAADMRwLTZqRYFJYCAAAAwPwkMAUAAAAAKBGYAgAAAACUCEwBAAAAAEoKRQ/GbDaqq2sauwSYZy1alOlZmhU9S3Okb2lu9CzNjZ6ludGzNDcLsmfLygopFArztK7AFAAAAACgxC35AAAAAAAlAlMAAAAAgBKBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwBQAAAAAoEZgCAAAAAJQITAEAAAAASgSmAAAAAAAlAlMAAAAAgBKBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwbeKefPLJ7LjjjlljjTUyaNCgXHTRRamqqmrssmAO7733Xvr165cnn3yyzvh//vOfjBgxImuvvXb69OmT/fffP2+88UYjVcl/s+rq6lx33XXZcssts8Yaa2Tw4ME544wzMmPGjNp19CtN0U033ZQtttgivXv3zpAhQ/K73/0uxWKxdrm+pSk75ZRT0rNnzzpjepampFgspm/fvunZs+ccXx988EESPUvT8+yzz2a33XbLGmuskYEDB2bEiBH58MMPa5frWZqSCRMmzPV37OyvSy65JEnT69tC8at/cdOkPPvss9l1112z0UYbZbvttsvEiRMzatSo7LLLLjnhhBMauzyo9c4772TvvffOK6+8ktGjR2fgwIFJvgyofv7zn2fq1Kk54ogjUl5enksvvTQzZ87MXXfdlXbt2jVy5fw3Oe+88zJ69OjsvffeWWuttfLqq69m1KhR6dGjR2688cYUi0X9SpNz7bXX5swzz8w+++yTtddeO88++2xGjRqVgw8+OAcddJDfszRpjz/+ePbZZ58Ui8W8+OKLSfxtQNPz+uuvZ7PNNssJJ5yQVVZZpc6y1VdfPWVlZXqWJuW5557LLrvskn79+mX48OF5//33c+GFF2appZbKuHHj/J6lyfn4449r/w74qksuuST/+te/Mm7cuHTv3r3p9W2RJmuvvfYqbr311sWamprasWuuuaa48sorF999991GrAy+VF1dXbzllluKAwYMKPbv379YUVFRfOKJJ2qX33XXXcWKioric889Vzv27rvvFnv16lW88sorG6Nk/kt9+umnxVVXXbV49tln1xm/8847ixUVFcUnn3xSv9LkVFdXFwcOHFg86qij6owfffTRxQEDBhSLRb9nabqmTZtWXH/99YuDBg0qVlRU1I7rWZqae++9t1hRUVH84IMP5rpcz9LUDB8+vDh06NDiF198UTt2//33FzfYYIPia6+9pmdpFsaPH1+sqKgo3n333cVisWn+rnVLfhM1a9asTJgwIZtuumkKhULt+BZbbJHq6uo89thjjVgdfOnFF1/MSSedlG233TZnn332HMsfe+yx/OQnP8mqq65aO7b44otnzTXXzMMPP7wAK+W/3fTp07Pddttl8803rzO+wgorJEnef/99/UqTUygUcs011+Twww+vM96qVavMmjUrid+zNF2nnHJKunfvnm222abOuJ6lqZk4cWK6dOmSLl26zHW5nqUpqayszF/+8pcMGzYs5eXlteObbbZZHnnkkXTv3l3P0uTNnDkzp59+egYNGpQtttgiSdP8XSswbaLefPPNfPHFF1luueXqjC+++OJZeOGF88orrzRSZfD/LbnkknnwwQdz7LHHZuGFF55j+SuvvJIePXrMMb7sssvqYRaoxRdfPKeeempWW221OuN/+tOfkiQ9e/bUrzQ5hUIhPXv2zNJLL51isZjKysqMGzcut912W4YNG5bE71maprvvvjsPP/xwzjjjjDmW6VmamkmTJqVdu3Y54IAD0rdv3/Tp0ydHHHFE3n///SR6lqblxRdfTE1NTbp06ZKjjz46ffr0SZ8+fXLUUUflo48+SqJnafquvfbavPfee3UeNdkU+1Zg2kR9/PHHSTLX5zS0bds2n3zyyYIuCeaw6KKLZokllvjG5R9//HEWWWSROcbbtWtX50U70BieffbZXHnlldl4442z0kor6VeatAkTJmTttdfOiSeemBVXXDF77LFHEr9naXree++9nHLKKTnuuOOy9NJLz7Fcz9LUTJw4MVOmTMmaa66ZK6+8MiNGjMiECROy22675dNPP9WzNClTp05NkpxwwgkpLy/PZZddlmOOOSaPPvpo9t1339TU1OhZmrRZs2ZlzJgx2WKLLdKtW7fa8abYt+XfvQqNoaamJknq3I4PzU2xWPzGHtbbNKYJEybkoIMOyjLLLFM7A0q/0pR17949Y8aMyTvvvJNLL70022+/fW6++WZ9S5Nz/PHHZ4011sgOO+ww1+V6lqbmvPPOS9u2bWtf+LTWWmtlxRVXzLBhw3LrrbfqWZqUL774Ikmyyiqr1P4Nu84666R9+/Y54ogj8thjj+lZmrR77rknH374YfbZZ586402xbwWmTVT79u2TZK5J+ieffDLX5B2amkUWWWSuPTxjxgw9TKO55ZZbctJJJ6WioiK//e1vs+iiiybRrzRtSyyxRO2M/tVXXz1DhgzJuHHj9C1NytixY/PPf/4zt99+e6qqquosq6qqSllZmZ6lyenXr98cY2uttVbat2+fiRMn6lmalLZt2yZJBg0aVGd8vfXWS5K88MILepYm7f77788KK6yQlVZaqc54U+xbgWkTteyyy6a8vDyvv/56nfF33303M2fOzPLLL99IlcG869GjR/75z3/OMf7666/rYRrFxRdfnFGjRmX99dfPRRddVPtHZ6JfaXqmT5+eP//5z+nbt2+WWWaZ2vHu3bunXbt2eeedd/QtTcp9992X6dOnZ6ONNppj2aqrrpqhQ4fqWZqUqVOn5oEHHkj//v3rvDuipqYms2bNSseOHfUsTUr37t2T/P+ZprPN/keqhRdeWM/SZM2aNStPPPFE9t133zmWNcW+9QzTJqply5bp379/Hnjggdrb85Mvpy+Xl5dnnXXWacTqYN6sv/76mTx5ciZOnFg79t577+WZZ57J+uuv34iV8d/oyiuvzKhRo/Lzn/88V1xxRZ2wNNGvNE3HH398rr322jpjzzzzTGbMmJGVV15Z39KknHLKKbn55pvrfG2//fZJkptvvjkHH3ywnqVJKS8vz6mnnprRo0fXGR8/fnxmzpyZAQMG6FmalOWXXz5LL7107r777hSLxdrxhx56KEmy5ppr6lmarEmTJuXzzz/PmmuuOceypti3heJX/yujSfnb3/6W4cOHZ4MNNsgOO+yQl156KZdeeml22WWXOm8Tg6ZgwoQJGT58eEaPHp2BAwcm+fJfPrfbbrtUVlbmiCOOyMILL5xLLrkkn3/+ee644w63hLDATJ48OT/72c+y7LLL5rTTTptjeffu3dOhQwf9SpNz3nnn5aqrrsq+++6b/v3759VXX83ll1+eJZZYIjfddFPKysr0LU3aBRdckP/93//Niy++mMTfBjQ9Z511VkaPHp0999wzAwcOzKRJk3LZZZelf//+ueKKK/QsTc59992Xww8/PJtsskl23HHHvPbaa7nooouyzjrr5LLLLtOzNFnjxo3LiSeemMceeyyLLbZYnWVNsW8Fpk3cww8/nAsvvDAvv/xyunTpku222y4HHXRQWrRo0dilQR1zC0yTL/9V6De/+U0ef/zxFAqF9OvXL8cdd1yWXXbZRqyW/za//e1vc+65537j8tNPPz077LCDfqXJqampyY033pgbb7wxr7/+ehZddNEMGTIkhx9+eNq1a5fE71matq8HpomepWmprq7OmDFjMm7cuLz55pvp1KlTttxyyxx88MFZeOGFk+hZmp4///nPGTVqVF588cV06NAhP/vZz/KrX/0qrVq1SqJnaZr+93//NxdccEH++c9/1vbqVzW1vhWYAgAAAACUeIYpAAAAAECJwBQAAAAAoERgCgAAAABQIjAFAAAAACgRmAIAAAAAlAhMAQAAAABKBKYAAAAAACUCUwAAAACAEoEpAADN0qxZszJlypTGLuMb7bbbbll33XUbu4x6aerXFgBgfhKYAgDQ7EyZMiVbbbVVHn300cYu5Rvtv//+Oemkkxq7jO+tOVxbAID5qbyxCwAAgO/rrbfeyuTJkxu7jG/VXGeXNodrCwAwP5lhCgAAAABQIjAFAPgR2m233bLzzjvn0UcfzVZbbZXevXtniy22yO9///s51n3vvfdy3HHHZeDAgVlttdWy5ZZbZuzYsXXWueWWW9KzZ8888MAD2WyzzdK7d++ccsoptctvvPHGbLPNNll99dWz4YYbZuTIkZk6dWqdfTzyyCPZeeeds8Yaa6Rv377Zd9998/zzz89R9x577JGnnnoqO+64Y3r37p111103p512WmbOnFlby/Dhw5MkI0eOTM+ePWu3nzRpUo444oist956WXXVVTNgwIAceOCB+fe//13nODNmzMjpp5+e9ddfP6uvvnp23333vPjii1lllVVyySWX1Fn3tttuy3bbbZfevXtnwIABOeyww/LGG2/M08/gq7NMjz322Gy66ab55z//mWHDhmX11VfPBhtskCuvvDLFYjFjxozJ4MGD06dPn+y888554YUXaredMGFCevbsmfHjx+fEE0/MWmutlf79++ewww7LW2+9Ncexb7311gwdOjS9evVKv379cuCBB+bFF1+c67W+9NJL06dPnwwYMOAHX9vZdT722GP5n//5n6y33nrp3bt3dtxxxzz11FNz1Hnvvfdmp512Sp8+fbLeeuvlyCOPnOPZqc8++2z23nvv9O3bN2ussUZ23XXXue4LAKChFIrFYrGxiwAAoGHttttuee211/LRRx9l6623zsorr5x77rknf//73/OrX/0q++23X5Ivw9Kf//znqaqqys4775zOnTvn8ccfz0MPPZTddtstJ554YpIvQ8rjjjsubdq0yc4775zFFlssPXr0yKBBg3L66adnzJgxWW+99bLRRhvlvffey3XXXZcVV1wxN954YxZaaKHccsstOf7447PWWmtlyJAh+eSTTzJu3Lh88MEHufbaa9O3b986dX/yySfZfvvtU1FRkfHjx+eRRx7JXnvtlWOOOSZvvvlmbr755vzv//5vtttuu6y99trZZptt8vLLL+fnP/95llhiieywww5ZZJFF8txzz+WWW27J4osvngcffDBlZWWprq7OsGHD8n//93/ZYYcd0rNnz/zpT3/Kc889l+nTp+eggw7KIYcckiS59NJLc8kll2SjjTbK+uuvn6lTp+aGG25ITU1N/vCHP6Rbt27f+jN49dVX88QTTyT5MjAdP358CoVCtt122yy33HIZN25cnn/++ay//vqZPHlyhg0blpkzZ2bUqFFZbLHFct9996Vly5aZMGFChg8fnqWWWiotW7bML37xi1RWVua6665L+/btc8cdd6Rjx45JknPOOSdXXXVV1lxzzQwZMiTTp0/PDTfckJkzZ+Z3v/tdevfuXVvfc889lw4dOmTffffNW2+9le222y533XVXva/t7DqXXnrpLLrootl2223z6aef5pprrsnMmTPz8MMPp1OnTkmS0aNH58wzz0zv3r3zs5/9LJ9++ml+97vfpV27drnlllvSoUOHPPHEE9lvv/2y3HLLZdttt02S3H777XnppZdywQUX5Kc//WkD/5cDAJCkCADAj86uu+5arKioKF5xxRW1Y1988UVxhx12KPbu3btYWVlZLBaLxWOOOabYt2/f4ptvvlln+9NOO61YUVFRnDhxYrFYLBb/+Mc/FisqKoqHHXZYnfX+/e9/F3v27Fk89NBD64zfdNNNxYqKiuL48eOLH3/8cbFv377F/fffv84606dPLw4aNKg4dOjQOeq+++67a8eqq6uLm2yySXHdddetHXv66aeLFRUVxRtuuKF2bOTIkcVVV121+N5779U5zumnn16sqKgoPvfcc8VisVi89dZbixUVFcXRo0fXrlNTU1M84IADihUVFcWLL764WCwWi2+88UZxpZVWKp522ml19jdlypRinz59igcffHDx2+y6667FgQMH1n4+5phjihUVFcUrr7yyduyll14qVlRUFFdfffXiu+++Wzt+zjnnFCsqKoqTJk2qc77rrrtucdq0abXrPfTQQ8WKioriOeecUywWi8WXX365uNJKKxX32muvYlVVVZ2a11hjjeI222xTp76Kioriww8/XKfuH3JtZ2+75ZZbFmfNmlW73i233FKsqKgo3nTTTcVisVicNm1asVevXsVf/OIXxS+++KJ2vccee6xYUVFR/N3vflf7cx86dGidfX3++efF7bffvrjuuusWP//882+8/gAA9eWWfACAH6k2bdpk9913r/1cXl6e3XbbLTNnzsxTTz2VmpqajB8/Pn369EmbNm0yderU2q/ZM/cefvjhOvtcf/3163x++OGHUywW6xwnSbbddtv88Y9/zMCBA/PEE09kxowZGTJkSJ1jfPHFF9lwww3z/PPP57333qvddqGFFsqmm25a+7msrCwrrbRS/vOf/3zr+Z500kl59NFHs9hii9WOzZw5MwsttFCS5NNPP02SPPjgg2nTpk122WWX2vUKhULtrNvZHnzwwdTU1GTw4MF16l544YXTv3//PProo6mqqvrWmuZmyJAhtd/36NEjSdKrV68svvjiteOzZ65+8MEHdbYdNmxYOnToUPt5o402Svfu3fPnP/85SfLQQw+lpqYm++23X1q0aFG73lJLLZWtt946EydOrHMLf3l5edZZZ53vrHler+1sm222We2yJFl55ZWTJB9++GGS5Mknn8znn3+eYcOGpbz8/7+Hdr311su4ceMydOjQvPDCC3nzzTczePDgfPzxx7XXf8aMGdlss83ywQcf5LnnnvvO2gEAvq/y714FAIDmaJlllkmrVq3qjM0O4qZMmZKpU6fm448/zmOPPfaNodnbb79d53Pnzp3rfJ79vMmv35reqlWrrLbaakmS119/PUlyzDHHfGOtb7/9dm1guMgii9QJ25IvQ9Samppv3D75MvScMWNGRo8enUmTJuWNN97Im2++merq6iSp3f6NN96ovbX9q5Zbbrk6n2fX/fUw+KumTp1aJ0ScF1+9hrPDwq9f19lh59fPeYUVVphjf926dctf/vKXJKkNQ79+Lkmy/PLLJ/nyZ/aTn/wkyZfX+uvXYW7m9drONvu2+9lm/zxnr/dNfZOk9pEBs58Te9FFF+Wiiy6aa11vv/127eMcAAAaisAUAOBH6qsz92abHXCVl5fXhlcbb7xxdtttt7nu4+thYFlZ3RuUZu/v68HsVxVLj8w/6aSTamdUft1XA76vH2NePfrooznwwAPTsWPHrLPOOunfv39WW221vPjiiznjjDNq1/viiy/SunXr79zf7LovvvjiLLLIInNd56uzPefV3H4uhUKh3ttWV1fXBqzFb3k9weyf1VcD0q/OQv0283ptZ/uun+Hs3vu2sHb2OgceeGD69es313XmFiADAPxQAlMAgB+pKVOmpKampk54NXny5CRfzuzr1KlTWrdunVmzZmXgwIF1tp06dWr++te/futLjZJk6aWXrt3v7BmlyZe3a48YMSJbbLFF7TqLLrroHMd59tlnM2PGjCy88ML1Ps/ZTjnllCyxxBK57bbb0q5du9rx2bMvZ+vWrVv+9re/1Qkak/8/o/Tr57b44otnjTXWqLNs9lva52V2ZkOaPevyqyZPnlz7c5o9c/SVV15Jly5d6qz36quvJkmWWGKJ733ceb2282qppZZK8uU1X2mlleosO/bYY7P66qvXjrdu3XqOvnnxxRfzzjvvzFPwDQDwfXmGKQDAj9S0adNy++23136eNWtWrrvuunTo0CHrrLNOysvLM2jQoDz55JP55z//WWfbiy++OIceemhefvnlbz3GhhtumCQZO3ZsnfF77rkn999/fwqFQtZdd90svPDCufrqqzNr1qw69R166KE57rjj5nmm42xzu2V92rRpWXLJJesEepWVlbXXYPYMy8022ywzZszIHXfcUWefv/vd7+p83njjjZMkV1xxRZ3jvPnmmznggANy3nnnzfPM0IZy00031bmG9913X956663aZ85usskmKRQKufLKK+vU/Pbbb+fOO+/MqquumiWXXPJbj/FDru28GjhwYFq2bJmbbrqpzrYTJkzIrbfems8++yyrrbZaFltssYwdOzYff/xx7TqzZs3KMccck0MPPbRez5AFAPguZpgCAPxIlZeX5+STT86kSZPyk5/8JHfeeWcmTpyYM888s3ZG51FHHZUJEyZk9913z84775xu3brl6aefzj333JMNN9xwjpc8fV3Pnj0zbNiwjB07NlOnTs2gQYPy1ltvZezYsVl77bUzePDgtGjRIkceeWT+53/+Jz//+c+zzTbbpEWLFrnpppvy/vvv5/zzz5/rrebfZvYzP+++++60bNkyQ4cOzYYbbpi77rorxx9/fPr06ZN3330348aNy7Rp05Ikn3zySZIvX0j1hz/8ISeccEL++c9/ZoUVVsjjjz+eJ598Msn/vz1+xRVXzJ577pnRo0dnt912y5AhQzJz5sxcf/31qa6uzrHHHvu9am4IU6ZMyU477ZRtt90277zzTsaMGZMVV1wxw4cPT/Llc0r32muvXH311dl1113z05/+NNOnT88NN9yQJDn55JO/8xg/5NrOq06dOuXwww/P2WefnV133TVbbLFFPvroo1x33XVZccUVs9NOO2WhhRbKSSedlMMOOyzbbLNNdtxxxyyyyCK57bbbMnHixBx11FHp2LHj9zouAMC8EJgCAPxILbroojnjjDPym9/8Jm+//XYqKioyatSobLLJJrXrLLPMMhk3blwuvvji3Hbbbfn444+z1FJL5ZBDDsk+++wzT88T/fWvf51u3brl97//fc4444x07do1w4YNy0EHHVQ7W3H48OFZcsklc/XVV+eSSy7JQgstlIqKihx33HEZNGjQ9z63Hj16ZPfdd8/NN9+c3/zmNxkwYEBOPvnktG3bNg899FDuvvvuLL744rXPZ/3Zz36WJ598MptuumlatGiRK6+8Muedd17uvffefPrpp1lzzTVz3nnn5aCDDqpzm/2xxx6b5ZZbLjfeeGPOPffctGnTJquttloOPvjgOW7TXxAOP/zwvPTSS7ngggvSunXrbL/99vnVr35V55EGI0aMSI8ePTJ27Nicc845adu2bfr3759DDjkkK6644nce44dc2+9j7733TteuXXPttdfm7LPPTseOHbPZZpvliCOOSJs2bZIkm266aa699tpcfvnlufLKK1MsFrPccsvl7LPPzjbbbPP9Lh4AwDwqFL/tyfAAADRLu+22W1599dU88cQTjV1KkzNt2rS0adNmjueP/t///V923HHH2pmwTcmECRMyfPjwjBw5MjvvvHNjlwMA8KPmGaYAAPxXGTt2bNZYY405XvJ0zz33JEl69+7dGGUBANBEuCUfAID/Kptvvnn+93//N/vuu2923HHHtG/fPs8880xuu+22DB06NBUVFY1dIgAAjUhgCgDAf5XlllsuY8eOzWWXXZZrrrkmM2bMyLLLLpsRI0Zkjz32aOzyAABoZJ5hCgAAAABQ4hmmAAAAAAAlAlMAAAAAgBKBKQAAAABAicAUAAAAAKBEYAoAAAAAUCIwBQAAAAAoEZgCAAAAAJQITAEAAAAASv4fOlZ2qAb4xrkAAAAASUVORK5CYII='
      )
    );
    return this.http
      .post<TrainingResultDto>(
        `${this.baseUrl}train/`,
        this.trainingModelToTrainingDto(trainingModel)
      )
      .pipe(
        map((res: TrainingResultDto) =>
          this.trainingResultDtoToTrainingResultModel(res)
        ),
        catchError((err) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { isTest: false },
          });
          return of(null);
        })
      );
  }

  public predict(
    testingModel: TestingModel
  ): Observable<TestingResultModel | null> {
    testingModel.targetColumn = testingModel.targetColumn.replace('\r', '');
    return of(
      new TestingResultModel(
        0.9155567548918598,
        'YWdlLHNleCxibWksY2hpbGRyZW4sc21va2VyLHJlZ2lvbixjaGFyZ2VzDQoxOSxmZW1hbGUsMjcuOSwwLHllcyxzb3V0aHdlc3QsMTY4ODQuOTI0DQoxOCxtYWxlLDMzLjc3LDEsbm8sc291dGhlYXN0LDE3MjUuNTUyMw0KMjgsbWFsZSwzMywzLG5vLHNvdXRoZWFzdCw0NDQ5LjQ2Mg0K'
      )
    );
    return this.http
      .post<TestingResultDto>(
        `${this.baseUrl}test/`,
        this.testingModelToTestingDto(testingModel)
      )
      .pipe(
        map((res: TestingResultDto) =>
          this.testingResultDtoToTestingResultModel(res)
        ),
        catchError((err) => {
          this.dialog.open(ErrorDialogComponent, {
            data: { isTest: true },
          });
          return of(null);
        })
      );
  }

  public downloadCSV(fileContent: string): void {
    const data: Blob = new Blob([fileContent], {
      type: 'text/csv;charset=utf-8',
    });

    saveAs(
      data,
      this.trainingDatasetName.value.replace('.csv', '') + '_solution.csv'
    );
  }

  private trainingModelToTrainingDto(
    trainingModel: TrainingModel
  ): TrainingDto {
    return new TrainingDto(
      trainingModel.targetColumn,
      trainingModel.fileContent,
      trainingModel.filename,
      trainingModel.lang
    );
  }

  private trainingResultDtoToTrainingResultModel(
    trainingResultDto: TrainingResultDto
  ): TrainingResultModel {
    return new TrainingResultModel(
      trainingResultDto.score,
      trainingResultDto.shape,
      trainingResultDto.useless_columns,
      trainingResultDto.duplicated_rows,
      trainingResultDto.features_report_file,
      trainingResultDto.feature_importance_image
    );
  }

  private testingModelToTestingDto(testingModel: TestingModel): TestingDto {
    return new TestingDto(
      testingModel.targetColumn,
      testingModel.fileContent,
      testingModel.filename,
      testingModel.trainFilename
    );
  }

  private testingResultDtoToTestingResultModel(
    testingResultDto: TestingResultDto
  ): TestingResultModel {
    return new TestingResultModel(
      testingResultDto.score,
      testingResultDto.file
    );
  }
}
